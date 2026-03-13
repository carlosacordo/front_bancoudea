import React, { useState } from 'react';
import Button from '../components/atoms/Button';
import Table, { Client } from '../components/molecules/Table';
import ModalClient, { ModalMode } from '../components/molecules/ModalClient';

const HomePage: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([
    {
      id: 1,
      firstName: 'Spotify',
      lastName: '',
      accountNumber: 'Visa 1234',
      balance: 2500,
      logoUrl: 'https://docs.material-tailwind.com/img/logos/logo-spotify.svg',
      date: 'Wed 3:00pm',
      status: 'paid',
      accountLogoUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png',
      accountName: 'Visa 1234',
      accountExpiry: '06/2026',
    },
    {
      id: 2,
      firstName: 'Amazonas',
      lastName: '',
      accountNumber: 'Mastercard 1234',
      balance: 5000,
      logoUrl: 'https://docs.material-tailwind.com/img/logos/logo-amazon.svg',
      date: 'Wed 1:00pm',
      status: 'paid',
      accountLogoUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png',
      accountName: 'Mastercard 1234',
      accountExpiry: '06/2026',
    },
    {
      id: 3,
      firstName: 'Pinterest',
      lastName: '',
      accountNumber: 'Mastercard 1234',
      balance: -3400,
      logoUrl: 'https://docs.material-tailwind.com/img/logos/logo-pinterest.svg',
      date: 'Mon 7:40pm',
      status: 'pending',
      accountLogoUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png',
      accountName: 'Mastercard 1234',
      accountExpiry: '06/2026',
    },
    {
      id: 4,
      firstName: 'Google',
      lastName: '',
      accountNumber: 'Visa 1234',
      balance: 1000,
      logoUrl: 'https://docs.material-tailwind.com/img/logos/logo-google.svg',
      date: 'Wed 5:00pm',
      status: 'paid',
      accountLogoUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png',
      accountName: 'Visa 1234',
      accountExpiry: '06/2026',
    },
    {
      id: 5,
      firstName: 'Netflix',
      lastName: '',
      accountNumber: 'Visa 1234',
      balance: -14000,
      logoUrl: 'https://docs.material-tailwind.com/img/logos/logo-netflix.svg',
      date: 'Wed 3:30am',
      status: 'cancelled',
      accountLogoUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png',
      accountName: 'Visa 1234',
      accountExpiry: '06/2026',
    },
  ]);
  const [clients, setClients] = useState<Client[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  );

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  // fetch clients once on mount
  React.useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/customers`)
      .then((r) => r.json())
      .then((data: Client[]) => {
        setAllClients(data);
        setClients(data.slice(0, perPage));
      })
      .catch((err) => console.error('Error fetching clients', err));
  }, [apiBase]);

  const handleSearch = (term: string) => {
    const filtered = allClients.filter(
      (c) =>
        c.firstName.toLowerCase().includes(term.toLowerCase()) ||
        c.lastName.toLowerCase().includes(term.toLowerCase()) ||
        c.accountNumber.includes(term)
    );
    setClients(filtered.slice(0, perPage));
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    const start = (newPage - 1) * perPage;
    setClients(allClients.slice(start, start + perPage));
    setPage(newPage);
  };

  const handleView = (client: Client) => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/customers/${client.id}`)
      .then((r) => r.json())
      .then((data: Client) => {
        setSelectedClient(data);
        setModalMode('view');
        setModalOpen(true);
      })
      .catch((err) => console.error('Error fetching client', err));
  };

  const handleEdit = (client: Client) => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/customers/${client.id}`)
      .then((r) => r.json())
      .then((data: Client) => {
        setSelectedClient(data);
        setModalMode('edit');
        setModalOpen(true);
      })
      .catch((err) => console.error('Error fetching client', err));
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedClient(undefined);
  };

  const handleSave = (data: Omit<Client, 'id'>) => {
    // no-ops for now since only GET is available
    handleClose();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-2xl font-bold mb-4">Bienvenido a Front Bancoudea</h1>
      <Table
        clients={clients}
        onView={handleView}
        onEdit={handleEdit}
        title="Clientes registrados"
        description="Estos son detalles sobre los clientes registrados."
        showSearch={true}
        onSearch={handleSearch}
      />

      <ModalClient
        open={modalOpen}
        mode={modalMode}
        client={selectedClient}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default HomePage;