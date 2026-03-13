import React from 'react';
import Button from '../atoms/Button';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
  // additional optional fields for transaction-style table
  logoUrl?: string;
  date?: string;
  status?: 'paid' | 'pending' | 'cancelled' | string;
  accountLogoUrl?: string;
  accountName?: string;
  accountExpiry?: string;
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

  // helper to render status badge based on status field or balance
  const renderStatus = (client: Client) => {
    const status = client.status
      ? client.status.toString().toLowerCase()
      : client.balance >= 0
      ? 'paid'
      : 'cancelled';

    const colorClass =
      status === 'paid'
        ? 'bg-green-500/20 text-green-900'
        : status === 'pending'
        ? 'bg-amber-500/20 text-amber-900'
        : 'bg-red-500/20 text-red-900';

    return (
      <div
        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${colorClass}`}
      >
        <span>{status}</span>
      </div>
    );
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
                  <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <i className="fa-solid fa-magnifying-glass w-5 h-5" />
                  </div>
                  <input                    
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <label
                    className="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900"
                  >
                    Buscar
                  </label>
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
          <th className="">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Nombre
            </p>
          </th>
          <th className="">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Apellidos
            </p>
          </th>
          <th className="">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Saldo
            </p>
          </th>
          <th className="">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Número de cuenta
            </p>
          </th>
          <th className="">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Acciones
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50 row-table">
            <td className="">
              <div className="flex items-center gap-3">
                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                  {client.firstName}
                </p>
              </div>
            </td>
            <td className="">
              <div className="flex items-center gap-3">
                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                  {client.lastName}
                </p>
              </div>
            </td>
            <td className="">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                ${client.balance}
              </p>
            </td>
            <td className="">
              <div className="flex items-center gap-3">                
                <div className="flex flex-col">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900">
                    {client.accountNumber}
                  </p>
                </div>
              </div>
            </td>
            <td className="">
              <button className="btn"                
                type="button">
                <span
                  >
                  EDITAR
                </span>
              </button>
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
