import React, { useState } from 'react';
import Table, { Client } from '../components/molecules/Table';
import ModalClient, { ModalMode } from '../components/molecules/ModalClient';

const ClientsPage: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>(allClients);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;


  React.useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/customers`)
      .then((r) => r.json())
      .then((data: Client[]) => {
        setAllClients(data);
        setClients(data);
      })
      .catch((err) => console.error('Error fetching clients', err));
  }, [apiBase]);

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

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedClient(undefined);
  };

  const handleSave = (data: Omit<Client, 'id'>) => {
    // For now, just close the modal
    handleClose();
  };

  return (
    <div>
      <div>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <p>Lista de todos los clientes registrados.</p>
      {/* Tabla de historial */}
    </div>
      <Table
        clients={clients}
        onView={handleView}
        onEdit={handleEdit}
        title=""
        description=""
        showSearch={true}
        onSearch={handleSearch}
      />
      {modalOpen && selectedClient && (
        <ModalClient
          isOpen={modalOpen}
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