const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 19245;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// --- DATABASE SETUP ---
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  console.log(`Conectado a la base de datos SQLite en: ${dbPath}`);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientName TEXT NOT NULL,
        clientEmail TEXT,
        amount INTEGER NOT NULL,
        cardToken TEXT NOT NULL,
        lastPaymentDate TEXT,
        nextPaymentDate TEXT,
        status TEXT DEFAULT 'active'
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

  // Seeder: admin user
  db.get("SELECT * FROM users WHERE username = 'nivuadmin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['nivuadmin', 'nivuadmin061125']);
      console.log("Seeder: Usuario admin creado.");
    }
  });
});

// --- AUTH MIDDLEWARE ---
const AUTH_TOKEN = "nivu-secret-session-token-2026"; // Simple token for this implementation

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
};

// 1. Verificar pago y guardar suscripción (llamado tras redirección del botón)
app.post('/api/verify-payment', async (req, res) => {
  const { transactionId, clientTxId } = req.body;
  console.log(`Verificando transacción ${transactionId} para ${clientTxId}...`);

  try {
    const authHeader = process.env.PAYPHONE_TOKEN.startsWith('Bearer ')
      ? process.env.PAYPHONE_TOKEN
      : `Bearer ${process.env.PAYPHONE_TOKEN}`;

    // Endpoint específico para el flujo de BOTÓN v2
    const response = await axios.post(`https://pay.payphonetodoesposible.com/api/button/V2/Confirm`, {
      id: parseInt(transactionId),
      clientTxId: clientTxId
    }, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    console.log("Respuesta PayPhone:", JSON.stringify(data, null, 2));

    // En v2 la respuesta suele tener transactionStatus o statusCode
    if (data.transactionStatus === 'Approved' || data.statusCode === 3) {
      const clientName = (data.clientTransactionId && data.clientTransactionId.includes('-'))
        ? data.clientTransactionId.split('-')[1].replace(/_/g, ' ')
        : 'Cliente';
      const clientEmail = data.email;
      const amount = data.amount;
      const cardToken = data.cardToken;

      if (!cardToken) {
        console.warn("--- ADVERTENCIA: No se recibió cardToken ---");
        console.warn("La transacción fue APROBADA pero el merchant no tiene permisos de Tokenización.");
        console.warn("Se guardará la suscripción como activa, pero los cobros recurrentes requerirán intervención manual.");
      }

      // Calcular siguiente fecha (30 días)
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 30);

      const query = `INSERT INTO subscriptions (clientName, clientEmail, amount, cardToken, lastPaymentDate, nextPaymentDate) 
                           VALUES (?, ?, ?, ?, ?, ?)`;

      db.run(query, [clientName, clientEmail, amount, cardToken || 'MANUAL-REQUIRED', new Date().toISOString(), nextDate.toISOString()], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          success: true,
          message: 'Pago verificado exitosamente',
          warning: !cardToken ? 'Cobros recurrentes requieren activación de Tokenización en PayPhone' : null
        });
      });
    } else {
      res.status(400).json({ error: 'La transacción no fue aprobada', status: data.status });
    }
  } catch (error) {
    console.error("--- ERROR VERIFICANDO PAGO ---");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({ error: 'Error interno al verificar pago', detail: error.message });
  }
});

// 2. Obtener lista de clientes (para el admin) - PROTECTED
app.get('/api/subscriptions', authenticate, (req, res) => {
  db.all("SELECT * FROM subscriptions", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 3. Actualizar suscripción - PROTECTED
app.put('/api/subscriptions/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { clientName, amount, nextPaymentDate, status } = req.body;

  const query = `UPDATE subscriptions 
                 SET clientName = COALESCE(?, clientName), 
                     amount = COALESCE(?, amount), 
                     nextPaymentDate = COALESCE(?, nextPaymentDate),
                     status = COALESCE(?, status)
                 WHERE id = ?`;

  db.run(query, [clientName, amount, nextPaymentDate, status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json({ success: true, message: 'Suscripción actualizada' });
  });
});

// 4. Eliminar suscripción - PROTECTED
app.delete('/api/subscriptions/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM subscriptions WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json({ success: true, message: 'Suscripción eliminada' });
  });
});

// 5. Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user) {
      res.json({ success: true, token: AUTH_TOKEN });
    } else {
      res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
  });
});

const CryptoJS = require('crypto-js');

// --- ENCRYPT HELPER ---
function encryptAES(text, key) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(text, keyUtf8, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse("") // PayPhone usa IV vacío para CBC sin vector de inicialización (según doc PHP ejemplo)
  });
  return encrypted.toString();
}

// --- CRON JOB (Cobros Recurrentes) ---
cron.schedule('0 0 * * *', async () => {
  console.log('Revisando cobros recurrentes...');
  const today = new Date().toISOString().split('T')[0];

  db.all("SELECT * FROM subscriptions WHERE status = 'active' AND nextPaymentDate LIKE ?", [`${today}%`], async (err, subs) => {
    if (err) return console.error(err);

    for (const sub of subs) {
      try {
        console.log(`Procesando cobro para ${sub.clientName} - $${sub.amount / 100}`);

        // Llamada al API de PayPhone V2 (Tokenización)
        // Endpoint sugerido en docs: https://pay.payphonetodoesposible.com/api/v2/pay/token
        const response = await axios.post('https://pay.payphonetodoesposible.com/api/v2/pay/token', {
          cardToken: sub.cardToken,
          amount: sub.amount,
          amountWithoutTax: sub.amount,
          amountWithTax: 0,
          tax: 0,
          currency: "USD",
          clientTransactionId: `REC-${sub.id}-${Date.now()}`,
          storeId: process.env.PAYPHONE_STORE_ID
        }, {
          headers: { 'Authorization': `Bearer ${process.env.PAYPHONE_TOKEN}` }
        });

        if (response.data.status === 'Approved' || response.data.transactionStatus === 'Approved') {
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + 30);
          db.run("UPDATE subscriptions SET lastPaymentDate = ?, nextPaymentDate = ? WHERE id = ?", [new Date().toISOString(), nextDate.toISOString(), sub.id]);
          console.log(`Cobro exitoso para ${sub.clientName}`);
        } else {
          console.warn(`Cobro rechazado para ${sub.clientName}: ${response.data.status}`);
          // Opcional: Marcar suscripción como pendiente de pago
        }
      } catch (error) {
        console.error(`Error cobrando a ${sub.clientName}:`, error.response?.data || error.message);
      }
    }
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Nivu Pago corriendo en puerto ${port}`);
});
