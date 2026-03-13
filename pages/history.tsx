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
  transactions,
  showSearch = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions ? transactions.filter(
    (tx) =>
      tx.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toString().includes(searchTerm)
  ) : [];

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border custom-spacing">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
        <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
          <div>
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Historial de Transacciones
            </h5>
            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Aquí puedes ver el historial de todas las transacciones.
            </p>
          </div>
          {/* Controles a la derecha: búsqueda */}
          <div className="flex ml-auto max-w-full gap-2 shrink-0">
            {showSearch && (
              <div className="w-full">
                <div className="relative h-10">
                  <input
                    className="w-full h-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 px-0">
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
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 row-table">
                <td className="py-3">
                  <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                    {tx.id}
                  </p>
                </td>
                <td className="py-3">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {tx.fromAccount}
                  </p>
                </td>
                <td className="py-3">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {tx.toAccount}
                  </p>
                </td>
                <td className="py-3">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    ${tx.amount.toFixed(2)}
                  </p>
                </td>
                <td className="py-3">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {tx.date}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;