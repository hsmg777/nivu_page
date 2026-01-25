import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Plus, User, DollarSign, ExternalLink, CheckCircle, Clock, Calendar, ShieldCheck, Mail, Trash2, Edit2, X, Save, LogOut } from 'lucide-react';

interface Subscription {
    id: number;
    clientName: string;
    clientEmail: string;
    amount: number;
    lastPaymentDate: string;
    nextPaymentDate: string;
    status: string;
}

export const AdminSubscriptions = () => {
    const navigate = useNavigate();
    const [clientName, setClientName] = useState('');
    const [amount, setAmount] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // UI state for editing
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editAmount, setEditAmount] = useState<number>(0);
    const [editDate, setEditDate] = useState<string>('');

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('nivu_admin_token')}`
    });

    const handleLogout = () => {
        localStorage.removeItem('nivu_admin_token');
        navigate('/admin/login');
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        setIsLoading(true);
        try {
            const resp = await fetch('/api/subscriptions', {
                headers: getAuthHeaders()
            });
            if (resp.status === 401) return handleLogout();
            const data = await resp.json();
            setSubscriptions(data);
        } catch (err) {
            console.error('Error fetching subs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = () => {
        if (!clientName || !amount) return;
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/pagar?c=${encodeURIComponent(clientName)}&m=${amount}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta suscripción? Esto detendrá los cobros automáticos.')) return;

        try {
            const resp = await fetch(`/api/subscriptions/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (resp.status === 401) return handleLogout();
            if (resp.ok) {
                fetchSubscriptions();
            }
        } catch (err) {
            console.error('Error deleting sub:', err);
        }
    };

    const startEditing = (sub: Subscription) => {
        setEditingId(sub.id);
        setEditAmount(sub.amount / 100);
        setEditDate(sub.nextPaymentDate.split('T')[0]);
    };

    const handleUpdate = async (id: number) => {
        try {
            const resp = await fetch(`/api/subscriptions/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    amount: editAmount * 100,
                    nextPaymentDate: editDate
                })
            });
            if (resp.status === 401) return handleLogout();
            if (resp.ok) {
                setEditingId(null);
                fetchSubscriptions();
            }
        } catch (err) {
            console.error('Error updating sub:', err);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen pt-24 font-sans text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-200">
                        <img
                            src="/images/logo_nube.png"
                            alt="Nivu Logo"
                            className="w-10 h-10 object-contain brightness-0 invert"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter">
                            Nivu<span className="text-blue-600">Admin</span>
                        </h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Dashboard de Suscripciones</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 transition shadow-sm font-bold text-xs uppercase tracking-widest"
                    >
                        <LogOut size={16} />
                        Salir
                    </button>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="bg-green-500/10 p-2 rounded-xl text-green-600">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="pr-4">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Estado de API</p>
                            <p className="text-sm font-bold text-slate-700">Conectado a PayPhone</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Section: Generate Link */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <Plus className="text-blue-600" size={24} /> Nueva Suscripción
                        </h2>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nombre del Cliente</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="Ej: Juan Pérez"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monto Mensual (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="45.00"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                        >
                            Generar Link de Cobro
                        </button>

                        {generatedLink && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                                <p className="text-[10px] text-blue-400 font-bold uppercase mb-2">Link para compartir:</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-blue-800 font-mono truncate bg-white p-2 rounded-lg border border-blue-100 flex-grow">{generatedLink}</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section: Subscriptions Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <User className="text-green-600" size={24} /> Clientes Activos
                            </h2>
                            <button
                                onClick={fetchSubscriptions}
                                className="p-2 text-slate-400 hover:text-blue-600 transition"
                                title="Actualizar"
                            >
                                <Clock size={20} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Info Cliente</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Plan</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Próximo Cobro</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {subscriptions.map((sub) => (
                                        <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                        {sub.clientName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 leading-none mb-1">{sub.clientName}</p>
                                                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                            <Mail size={10} />
                                                            {sub.clientEmail || 'Sin email'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 text-center">
                                                {editingId === sub.id ? (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <input
                                                            type="number"
                                                            value={editAmount}
                                                            onChange={(e) => setEditAmount(Number(e.target.value))}
                                                            className="w-16 text-xs p-1 border rounded"
                                                        />
                                                        <span className="text-[8px] text-slate-400 font-bold uppercase">USD</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="font-black text-blue-600">${sub.amount / 100}</span>
                                                        <p className="text-[10px] text-slate-300 font-bold">MENSUAL</p>
                                                    </>
                                                )}
                                            </td>
                                            <td className="py-5">
                                                {editingId === sub.id ? (
                                                    <input
                                                        type="date"
                                                        value={editDate}
                                                        onChange={(e) => setEditDate(e.target.value)}
                                                        className="text-xs p-1 border rounded"
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Calendar size={14} className="text-slate-300" />
                                                            <span className="text-sm font-medium">{new Date(sub.nextPaymentDate).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })}</span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-300 font-bold flex items-center gap-1">
                                                            Último: {sub.lastPaymentDate ? new Date(sub.lastPaymentDate).toLocaleDateString() : 'N/A'}
                                                        </p>
                                                    </>
                                                )}
                                            </td>
                                            <td className="py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {editingId === sub.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdate(sub.id)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                                title="Guardar"
                                                            >
                                                                <Save size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition"
                                                                title="Cancelar"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => startEditing(sub)}
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                                title="Editar"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(sub.id)}
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {subscriptions.length === 0 && !isLoading && (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center text-slate-300 italic font-medium">
                                                No hay clientes suscritos todavía.
                                            </td>
                                        </tr>
                                    )}
                                    {isLoading && (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center">
                                                <div className="animate-pulse flex flex-col items-center gap-3">
                                                    <div className="h-4 w-48 bg-slate-100 rounded-full"></div>
                                                    <div className="h-4 w-32 bg-slate-50 rounded-full"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
