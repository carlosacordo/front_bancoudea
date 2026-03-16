import React from 'react';
import Button from '../atoms/Button';



type TableProps = {
  data: any[];
  onCreate: () => void;  
  onDelete: (id: number) => void;
  onEdit: (item: any) => void;
  title?: string;
  description?: string;
  showSearch?: boolean;
  onSearch?: (term: string) => void;
  columns?: any[]; 
  fields?: string[]; 
  actions?: any[]; 
  showCreateButton?: boolean;
};

const Table: React.FC<TableProps> = ({
  data,
  onCreate,
  onDelete,
  onEdit,
  columns,
  fields,
  title,
  description,
  showSearch = false,
  actions,
  onSearch,
  showCreateButton = false,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        {showCreateButton && (
          <Button label="CREAR CLIENTE" classNameContent="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={onCreate} />
        )}
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
         {columns && columns.map((col) => (
              <th key={col} className="py-3">{col}</th>
        ))}
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50  ">
              {fields && fields.map((field) => (
                <td key={field} className='py-2'>
                  {['balance','amount'].includes(field) ? `$${c[field]}` : field === 'date' ? new Date(c[field]).toLocaleDateString() : c[field]}
                </td>
              ))}
              <td className="flex gap-2 py-2">
                {actions?.includes('onEdit') && (
                  <Button onClick={() => onEdit(c)} classNameContent="bg-green-500 text-white px-2 py-1 rounded text-sm" label='EDITAR'/>
                )}
                {actions?.includes('onDelete') && (
                  <Button onClick={() => onDelete(c.id)} classNameContent="bg-red-500 text-white px-2 py-1 rounded text-sm" label='ELIMINAR'/>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;