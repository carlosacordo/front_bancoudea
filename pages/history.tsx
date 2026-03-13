import React, { useState } from "react";

interface Transaction {
  id: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
}

interface HistoryPageProps {
  transactions: Transaction[];
  showSearch?: boolean;
}

const HistoryPage: React.FC<HistoryPageProps> = ({
  transactions: initialTransactions,
  showSearch = true,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // <-- nuevo estado
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setErrorMessage(""); // reiniciar mensaje de error
    try {
      const response = await fetch(
        `${apiBase}/api/transactions/${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setTransactions([]);
          setErrorMessage("No se han encontrado resultados para la búsqueda");
        } else {
          throw new Error("Error al buscar transacciones");
        }
      } else {
        const data = await response.json(); // puede ser array []
        if (!data || data.length === 0) {
          setTransactions([]);
          setErrorMessage("No se han encontrado resultados para la búsqueda");
        } else {
          const mappedData = data.map((tx: any) => ({
            id: tx.id,
            fromAccount: tx.senderAccountNumber,
            toAccount: tx.receiverAccountNumber,
            amount: tx.amount,
            date: tx.timestamp,
          }));
          setTransactions(mappedData);
        }
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
      setErrorMessage("No se han encontrado resultados para la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border custom-spacing">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
        <div className="flex flex-col justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div>
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Historial de Transacciones
            </h5>
            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Aquí puedes ver el historial de todas las transacciones por Nro de Cuenta.
            </p>
          </div>

          {showSearch && (
            <div className="flex gap-2 ml-auto max-w-full shrink-0">
              <input
                className="h-10 px-3 rounded-lg border border-gray-300 focus:outline-none transition w-full"
                placeholder="Buscar por Nro de Cuenta"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Buscar transacción por Nro de Cuenta"
              />
              <button
                onClick={handleSearchClick}
                className={`h-10 px-4 rounded-lg text-white transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 px-0">
        {transactions?.length === 0 && errorMessage ? (
          <p className="text-center text-gray-500 font-semibold">{errorMessage}</p>
        ) : (
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {["# Transacción", "Cuenta Emisora", "Cuenta Receptora", "Monto", "Fecha"].map(
                  (col) => (
                    <th key={col} className="py-3">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        {col}
                      </p>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 even:bg-gray-100">
                  <td className="py-3 font-bold text-sm text-blue-gray-900">{tx.id}</td>
                  <td className="py-3 text-sm text-blue-gray-900">{tx.fromAccount}</td>
                  <td className="py-3 text-sm text-blue-gray-900">{tx.toAccount}</td>
                  <td className="py-3 text-sm text-blue-gray-900">${tx.amount?.toFixed(2)}</td>
                  <td className="py-3 text-sm text-blue-gray-900">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;