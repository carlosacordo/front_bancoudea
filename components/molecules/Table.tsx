import React from 'react';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
}

type TableProps = {
  clients: Client[];
  onCreate: () => void;  
  onDelete: (id: number) => void;
  onEdit: (client: Client) => void;
  title?: string;
  description?: string;
  showSearch?: boolean;
  onSearch?: (term: string) => void;
};

const Table: React.FC<TableProps> = ({
  clients,
  onCreate,
  onDelete,
  onEdit,
  title = 'Recent Transactions',
  description,
  showSearch = false,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <button onClick={onCreate} className="btn-create bg-green-500 text-white px-4 rounded h-10">
          CREAR CLIENTE
        </button>
        <div className="flex flex-col items-center flex-1 mx-4">
          {title && <h5 className="text-xl font-semibold text-blue-gray-900">{title}</h5>}
          {description && <p className="text-gray-700 text-base mt-1">{description}</p>}
        </div>
        {showSearch && (
          <input
            className="w-64 h-10 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}
      </div>

      <table className="w-full table-auto  text-left">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Saldo</th>
            <th>Número de cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50  ">
              <td className='py-2'>{c.firstName}</td>
              <td className='py-2'>{c.lastName}</td>
              <td className='py-2'>${c.balance}</td>
              <td className='py-2'>{c.accountNumber}</td>
              <td className="flex gap-2 py-2">
                <button onClick={() => onEdit(c)} className="bg-green-500 text-white px-2 py-1 rounded">EDITAR</button>
                <button onClick={() => onDelete(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">ELIMINAR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;