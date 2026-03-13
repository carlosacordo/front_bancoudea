import React, { useState, useEffect } from 'react';
import Table, { Client } from '../components/molecules/Table';
import ModalClient, { ModalMode } from '../components/molecules/ModalClient';

const ClientsPage: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
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

  // Ver cliente
  const handleView = (client: Client) => {
    setSelectedClient(client);
    setModalMode('view');
    setModalOpen(true);
  };

  // Editar cliente
  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setModalMode('edit');
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
    setModalMode('edit');
    setModalOpen(true);
  };

  // Guardar cliente (POST)
  const handleSave = async (data: Omit<Client, 'id'>) => {
    try {
      if (!apiBase) throw new Error('API base URL no definida');

      const res = await fetch(`${apiBase}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error creando cliente');

      const newClient: Client = await res.json();
      console.log('Cliente creado:', newClient);

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

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-2">Clientes</h1>
        <p>Lista de todos los clientes registrados.</p>
      </div>

      <Table
        clients={clients}
        onView={handleView}
        onEdit={handleEdit}
        title=""
        description=""
        showSearch={true}
        onSearch={handleSearch}
        onCreate={handleCreate}
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