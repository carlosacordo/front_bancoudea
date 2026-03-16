import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { Client } from './Table';

export type ModalMode = 'view' | 'edit';

export type ModalClientProps = {
  open: boolean;
  mode: ModalMode;
  client?: Client;
  onClose: () => void;
  onSave: (data: Omit<Client, 'id'>, id?: number) => void;
};

const ModalClient: React.FC<ModalClientProps> = ({
  open,
  mode,
  client,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<Omit<Client, 'id'>>({
    firstName: '',
    lastName: '',
    accountNumber: '',
    balance: 0,
  });

  useEffect(() => {
    if (client) {
      const { id, ...rest } = client;
      setForm(rest);
    }
  }, [client]);

  if (!open) return null;

  const readOnly = mode === 'view';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'balance' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, client?.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 capitalize">{mode} cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              readOnly={readOnly}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              readOnly={readOnly}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de cuenta
            </label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              readOnly={readOnly}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Saldo
            </label>
            <input
              type="number"
              step="0.01"
              name="balance"
              value={form.balance}
              onChange={handleChange}
              readOnly={readOnly}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={onClose} className="bg-gray-500">
              Cerrar
            </Button>
            {!readOnly && (
              <Button type="submit" className="bg-blue-500">
                Guardar
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClient;
