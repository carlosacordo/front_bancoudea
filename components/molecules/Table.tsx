import React from 'react';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
}

export type TableProps = {
  clients: Client[];
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  title?: string;
  description?: string;
  showSearch?: boolean;
  onSearch?: (term: string) => void;
};

const Table: React.FC<TableProps> = ({
  clients,
  onView,
  onEdit,
  title = 'Recent Transactions',
  description,
  showSearch = false,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };


  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border custom-spacing">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
        <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
          <div>
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {title}
            </h5>
            {description && (
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {description}
              </p>
            )}
          </div>
          {/* right-hand controls: search + download */}
          <div className="flex ml-auto max-w-full gap-2 shrink-0">
            {showSearch && (
              <div className="w-full">
                <div className="relative h-10">
                  <input
                    className="w-full h-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none  transition"
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
      <div className="p-6 px-0 ">
        <table className="w-full text-left table-auto min-w-max">
      <thead>
        <tr>
          <th className="py-3">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Nombre
            </p>
          </th>
          <th className="py-3">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Apellidos
            </p>
          </th>
          <th className="py-3">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Saldo
            </p>
          </th>
          <th className="py-3">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Número de cuenta
            </p>
          </th>
          <th className="py-3">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Acciones
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50 row-table">
            <td className="py-3">
              <div className="flex items-center gap-3">
                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                  {client.firstName}
                </p>
              </div>
            </td>
            <td className="py-3">
              <div className="flex items-center gap-3">
                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                  {client.lastName}
                </p>
              </div>
            </td>
            <td className="py-3">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                ${client.balance}
              </p>
            </td>
            <td className="py-3">
              <div className="flex items-center gap-3">                
                <div className="flex flex-col">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900">
                    {client.accountNumber}
                  </p>
                </div>
              </div>
            </td>
            <td className="py-3">
              <div className="flex gap-2">                
                <button
                  className="btn bg-green-500 text-white px-2 py-1 rounded"
                  type="button"
                  onClick={() => onEdit(client)}
                >
                  EDITAR
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
};

export default Table;
