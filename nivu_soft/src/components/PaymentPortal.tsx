import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PaymentPortal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    // Params from initial link
    const clientName = query.get('c') || 'Cliente';
    const amount = parseFloat(query.get('m') || '0');

    // Params from PayPhone redirect
    const transactionId = query.get('id');
    const clientTransactionId = query.get('clientTransactionId');

    const [status, setStatus] = useState<'initial' | 'verifying' | 'success' | 'error'>('initial');
    const [errorMessage, setErrorMessage] = useState('');
    const buttonRendered = useRef(false);

    // Get current verified amount and name from transaction ID if available, otherwise from query
    const displayAmount = clientTransactionId && clientTransactionId.includes('-') && clientTransactionId.split('-').length >= 4
        ? parseFloat(clientTransactionId.split('-')[2])
        : amount;

    const displayClientName = clientTransactionId && clientTransactionId.startsWith('SUB-')
        ? clientTransactionId.split('-')[1].replace(/_/g, ' ')
        : clientName;

    const formattedAmount = displayAmount.toFixed(2).split('.');

    useEffect(() => {
        // 1. If we have a transactionId, verify it
        if (clientTransactionId && clientTransactionId.startsWith('SUB-')) {
            // ... (rest of the logic)
        }

        if (transactionId && clientTransactionId && status === 'initial') {
            verifyPayment(transactionId, clientTransactionId);
        }
        // 2. Otherwise, if we have an amount, show the button
        else if (amount > 0 && status === 'initial' && !buttonRendered.current) {
            renderPayPhoneButton();
        }
    }, [transactionId, clientTransactionId, amount, status]);

    const verifyPayment = async (id: string, clientTxId: string) => {
        setStatus('verifying');
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId: id, clientTxId })
            });
            const data = await response.json();

            if (data.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'No se pudo verificar el pago.');
            }
        } catch (err) {
            console.error("Error verificando pago", err);
            setStatus('error');
            setErrorMessage('Error de conexión con el servidor.');
        }
    };

    const renderPayPhoneButton = () => {
        if (!(window as any).PPaymentButtonBox) {
            console.error("PayPhone SDK not loaded");
            return;
        }

        buttonRendered.current = true;
        const ppb = new (window as any).PPaymentButtonBox({
            token: "ZO3qrJXFUc8MF__JrYBaA0SpThQamSero9fYZKHhlhX3vYyUHxtPDJKzrigSqg2U6wDBVbgsAXcK2BMmNSKaq0rVYUkxroJb4bLokhm1iVYH-47x5d9jpwPd_Jyy3wvig1LOixd3CNNKaknSYTBQa6c99PYIvKz3vySxcVuvR6EKCT-aIp3mGZcH7y3u6wqvs1Xou2RYbBPsY3aStv8o9VchMZPFpAUXy2ivqUSrnRioOYctW-ltS_QwluJmwdfN1TVusfwov9sY97GFeGcKziBd2WvIUTDOU6iqJvTx5mgvWtEVc41u_3DwPpgMH5AYANbVVWlELr647PucVIkpQTyRqgU",
            storeId: "e9f8dda3-f4ca-44e6-9837-50fe91952586",
            clientTransactionId: `SUB-${clientName.replace(/\s/g, '_')}-${amount}-${Date.now()}`,
            amount: Math.round(amount * 100),
            amountWithoutTax: Math.round(amount * 100),
            currency: "USD",
            reference: `Suscripción Nivu - ${clientName}`,
            lang: "es",
            tokenization: true,
            willSaveCard: true,
            // This will redirect back to this same page with id and clientTransactionId
        });

        ppb.render('pp-button');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans overflow-hidden">
            {/* Left Column: Branded Visual (Hidden on mobile) */}
            <div className="hidden md:flex md:w-5/12 lg:w-5/12 relative overflow-hidden bg-[#0ea5e9]">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/images/checkout-visual-light.png"
                        alt="Nivu Premium Light"
                        className="w-full h-full object-cover scale-110 animate-[float_20s_ease-in-out_infinite]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/50 via-transparent to-white/10" />
                </div>

                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-20"
                        >
                            <img src="/images/lg_nivu.png" alt="Nivu Logo" className="w-32 h-auto object-contain brightness-0 invert" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-none italic text-white uppercase drop-shadow-sm">
                                IMPULSA <br />
                                TU ÉXITO <br />
                                <span className="text-white/80">DIGITAL</span>
                            </h2>
                            <p className="text-xl text-white/90 max-w-sm font-medium leading-relaxed">
                                Software a medida diseñado para escalar tu visión. Potencia tu negocio con tecnología de vanguardia.
                            </p>
                            <div className="flex -space-x-3">
                                {['beelogo.jpeg', 'ma.jpg', 'vb.jpeg'].map((img, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0ea5e9] bg-white overflow-hidden backdrop-blur-sm">
                                        <img src={`/images/${img}`} alt={`Client ${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-white/90 uppercase tracking-widest">+50 COMPAÑÍAS CONFÍAN EN NOSOTROS</p>
                        </motion.div>
                    </div>
                </div>

                {/* Floating ambient light */}
                <div className="absolute top-1/2 -left-20 w-80 h-80 bg-white/10 blur-[130px] rounded-full" />
            </div>

            {/* Right Column: Checkout Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-100 pointer-events-none" />

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md w-full bg-white border border-slate-100 rounded-[3rem] p-12 text-center shadow-2xl z-20"
                        >
                            <div className="mb-10 relative inline-block">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 12 }}
                                    className="bg-green-50 p-6 rounded-full border border-green-200 relative z-10"
                                >
                                    <CheckCircle2 size={64} className="text-green-500" />
                                </motion.div>
                                <div className="absolute inset-0 bg-green-200/40 blur-3xl rounded-full" />
                            </div>
                            <h1 className="text-4xl font-black italic tracking-tighter mb-4 uppercase text-slate-900">¡Suscripción Lista!</h1>
                            <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                Todo está en orden. Tu equipo en <span className="text-[#0ea5e9] font-black">Nivu</span> empezará a trabajar hoy mismo.
                            </p>
                            <button
                                onClick={() => window.location.href = 'https://nivusoftware.com'}
                                className="w-full py-5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-black italic uppercase tracking-tighter rounded-2xl transition-all active:scale-95 shadow-lg shadow-sky-200"
                            >
                                Ver mas servicios
                            </button>
                        </motion.div>
                    ) : status === 'verifying' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-8 z-20"
                        >
                            <div className="relative inline-block">
                                <Loader2 className="w-20 h-20 text-[#0ea5e9] animate-spin mx-auto" />
                                <div className="absolute inset-0 bg-[#0ea5e9]/20 blur-2xl rounded-full" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Verificando...</h2>
                                <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Pago Seguro • PayPhone Connect</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl w-full"
                        >
                            {/* Mobile Logo */}
                            <div className="flex flex-col items-center mb-10 md:hidden">
                                <img src="/images/lg_nivu.png" alt="Nivu" className="w-40 h-auto mb-4" />
                            </div>

                            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/5 rounded-bl-[100px]" />

                                <div className="flex justify-between items-center mb-12 pb-8 border-b border-slate-50">
                                    <div>
                                        <p className="text-[#0ea5e9] font-black uppercase tracking-[0.2em] text-[10px] mb-2">Checkout Premium</p>
                                        <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900">Activar Plan</h2>
                                    </div>
                                    <div className="bg-sky-50 p-4 rounded-3xl border border-sky-100">
                                        <ShieldCheck className="text-[#0ea5e9]" size={28} />
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600 shadow-sm"
                                    >
                                        <AlertCircle size={24} className="flex-shrink-0" />
                                        <p className="text-sm font-bold italic uppercase tracking-tight">{errorMessage}</p>
                                    </motion.div>
                                )}

                                <div className="space-y-10 mb-12">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black">Cliente:</p>
                                            <p className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">
                                                {displayClientName}
                                            </p>
                                        </div>
                                        <div className="space-y-2 text-right">
                                            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black">Cuota Mensual</p>
                                            <p className="text-5xl font-black italic text-[#0ea5e9] tracking-tighter leading-none">
                                                ${formattedAmount[0]}<span className="text-2xl">.{formattedAmount[1]}</span>
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-4 text-[10px] text-slate-500 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 font-bold uppercase tracking-wider">
                                        <CreditCard size={20} className="text-[#0ea5e9] flex-shrink-0" />
                                        <p>Protección Bancaria PCI-DSS • Procesado por PayPhone</p>
                                    </div>
                                </div>

                                <div id="pp-button" className="w-full flex justify-center min-h-[80px] bg-slate-50 rounded-3xl overflow-hidden hover:bg-slate-100 transition-all border border-slate-100 group shadow-sm">
                                    {/* PayPhone Button Box renders here */}
                                </div>

                                <div className="mt-10 pt-10 border-t border-slate-50 text-center">
                                    <p className="text-[9px] text-slate-300 leading-relaxed font-black uppercase tracking-[0.2em] mb-4">
                                        Transacción Encriptada y Segura
                                    </p>
                                </div>
                            </div>

                            <p className="mt-10 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
                                Nivusoftware © 2026 - Desarrollo de software a medida
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: scale(1.1) rotate(0deg) translateY(0); }
                    50% { transform: scale(1.13) rotate(1deg) translateY(-20px); }
                }
            `}</style>
        </div>
    );
};
