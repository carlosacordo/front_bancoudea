import React, { useState, useEffect } from 'react';
import Table from '../components/molecules/Table';
import ModalClient, { ModalMode } from '../components/molecules/ModalClient';
import { Client } from '../types/clients';

const ClientsPage: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('Crear');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch inicial de clientes
  const fetchClients = async () => {
    if (!apiBase) return;
    try {
      const res = await fetch(`${apiBase}/api/customers`);
      const data: Client[] = await res.json();
      setAllClients(data);
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [apiBase]);

  // Buscar clientes
  const handleSearch = (term: string) => {
    const filtered = allClients.filter(
      (c) =>
        c.firstName.toLowerCase().includes(term.toLowerCase()) ||
        c.lastName.toLowerCase().includes(term.toLowerCase()) ||
        c.accountNumber.includes(term) ||
        c.balance.toString().includes(term)
    );
    setClients(filtered);
  };


  // Editar cliente
  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setModalMode('Editar');
    setModalOpen(true);
  };

  // Cerrar modal
  const handleClose = () => {
    setModalOpen(false);
    setSelectedClient(undefined);
  };

  // Crear cliente
  const handleCreate = () => {
    setSelectedClient(undefined);
    setModalMode('Crear');
    setModalOpen(true);
  };

  // Guardar cliente (POST)
  const handleSave = async (data: Omit<Client, 'id'>, id?: number) => {
    try {
      if (!apiBase) throw new Error('API base URL no definida');      
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers/${id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers`;

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error guardando cliente');
      }

    // ✅ Cierra el modal
    setModalOpen(false);
    setSelectedClient(undefined);


      // Cierra modal
      handleClose();

      // Refrescar lista de clientes
      fetchClients();
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al crear el cliente.');
      // También refrescamos la tabla por si se quiere mantener consistencia
      fetchClients();
    }
  };

  const handleDeleteClient = async (id: number) => {
  const confirmDelete = confirm('¿Seguro que deseas eliminar este cliente?');

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Error eliminando cliente');
    }

    console.log('Cliente eliminado');

    fetchClients();
  } catch (error) {
    console.error('Error eliminando cliente:', error);
    alert('Ocurrió un error al eliminar el cliente.');
  }
};

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-2">Clientes</h1>
        <p>Lista de todos los clientes registrados.</p>
      </div>

      <Table
        data={clients}
        onCreate={handleCreate}
        onEdit={handleEdit}
        title=""
        description=""
        showSearch={true}
        onSearch={handleSearch}
        onDelete={handleDeleteClient}
        columns={["Nombre","Apellidos","Saldo","Número de cuenta","Acciones"]}
        fields={["firstName","lastName","balance","accountNumber"]}
        actions={["onEdit","onDelete"]}
        showCreateButton={true}
        />
      {modalOpen && (
        <ModalClient
          open={modalOpen}
          mode={modalMode}
          client={selectedClient}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClientsPage;