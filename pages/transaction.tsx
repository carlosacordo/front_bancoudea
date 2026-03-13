import React, { useState } from 'react';

const TransactionPage: React.FC = () => {
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    // Validaciones
    if (!senderAccountNumber.trim() || !receiverAccountNumber.trim() || !amount.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (senderAccountNumber === receiverAccountNumber) {
      setError('Las cuentas no pueden ser las mismas');
      return;
    }
    const amountNumber = Number(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError('El monto debe ser un número positivo');
      return;
    }

    setLoading(true);
 
    try {
      const res = await fetch(`${apiBase}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderAccountNumber,
          receiverAccountNumber,
          amount: amountNumber,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Error al realizar la transacción');
      } else {
        setSuccess('Transacción realizada correctamente');
        setSenderAccountNumber('');
        setReceiverAccountNumber('');
        setAmount('');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2 text-blue-gray-900">
        Realizar Transacción
      </h1>
      <p className="text-gray-700 mb-4">
        Ingresa los datos para transferir saldo entre cuentas.
      </p>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Cuenta Origen</label>
        <input
          type="text"
          value={senderAccountNumber}
          onChange={(e) => setSenderAccountNumber(e.target.value)}
          placeholder="Número de cuenta del remitente"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Cuenta Destino</label>
        <input
          type="text"
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
          placeholder="Número de cuenta del receptor"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Monto</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto a transferir"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg transition hover:bg-blue-700 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
};

export default TransactionPage;