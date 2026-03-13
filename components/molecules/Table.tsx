import React from 'react';
import ModalClient from './ModalClient';
import { useRouter } from 'next/router';



export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
}

export type TableProps = {
  clients: Client[];
  onCreate: () => void;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  title?: string;
  description?: string;
  showSearch?: boolean;
  onSearch?: (term: string) => void;
};

const Table: React.FC<TableProps> = ({
  clients,
  onCreate,
  onView,
  onEdit,
  title = 'Recent Transactions',
  description,
  showSearch = false,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

 
  // Guardar cliente y hacer POST a la API
  const handleSaveClient = async (data: Omit<Client, 'id'>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Error al crear el cliente');
    }

    const newClient = await response.json();
    console.log('Cliente creado:', newClient);

    // Cierra el modal
    setModalOpen(false);

    // Redirecciona a /clients (puede ser la misma página)
    router.push('/clients');
  } catch (error) {
    console.error('Error creando cliente:', error);
    alert('Ocurrió un error al crear el cliente.');

    // También redireccionamos en caso de error
    router.push('/clients');
  }
};

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border custom-spacing">
      {/* Header */}
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Botón CREAR a la izquierda */}
          <button
            className="btn-create bg-green-500 text-white px-4 rounded h-10"
            type="button"
            onClick={onCreate}
          >
            CREAR CLIENTE
          </button>

          {/* Título y descripción centrados */}
          <div className="flex flex-col items-center flex-1 mx-4">
            <h5 className="text-xl font-semibold text-blue-gray-900">{title}</h5>
            {description && (
              <p className="text-gray-700 text-base mt-1">{description}</p>
            )}
          </div>

          {/* Barra de búsqueda a la derecha */}
          {showSearch && (
            <div className="w-64 h-10">
              <input
                className="w-full h-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none transition"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ModalClient
        open={modalOpen}
        mode="edit"
        onClose={() => setModalOpen(false)}
        onSave={handleSaveClient}
      />

      {/* Tabla */}
      <div className="p-6 px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="py-3">
                <p className="text-sm font-normal text-blue-gray-900 opacity-70">Nombre</p>
              </th>
              <th className="py-3">
                <p className="text-sm font-normal text-blue-gray-900 opacity-70">Apellidos</p>
              </th>
              <th className="py-3">
                <p className="text-sm font-normal text-blue-gray-900 opacity-70">Saldo</p>
              </th>
              <th className="py-3">
                <p className="text-sm font-normal text-blue-gray-900 opacity-70">Número de cuenta</p>
              </th>
              <th className="py-3">
                <p className="text-sm font-normal text-blue-gray-900 opacity-70">Acciones</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 row-table">
                <td className="py-3">
                  <p className="text-sm font-bold text-blue-gray-900">{client.firstName}</p>
                </td>
                <td className="py-3">
                  <p className="text-sm font-bold text-blue-gray-900">{client.lastName}</p>
                </td>
                <td className="py-3">
                  <p className="text-sm text-blue-gray-900">${client.balance}</p>
                </td>
                <td className="py-3">
                  <p className="text-sm text-blue-gray-900">{client.accountNumber}</p>
                </td>
                <td className="py-3">
                  <button
                    className="btn bg-green-500 text-white px-2 py-1 rounded"
                    type="button"
                    onClick={() => onEdit(client)}
                  >
                    EDITAR
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No hay clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;