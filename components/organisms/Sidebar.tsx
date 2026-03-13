import React from "react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menu = [
    { name: "Consultar Clientes", icon: "fa-users", path: "/clients" },
    { name: "Realizar Transacción", icon: "fa-exchange-alt", path: "/transaction" },
    { name: "Historial", icon: "fa-history", path: "/history" },
  ];

  return (
    <div
      className={`bg-slate-900 text-gray-200 h-screen transition-all duration-100
      ${isOpen ? "w-64" : "w-16"} flex flex-col`}
    >
      {/* Toggle */}
      <div className={`flex p-3 ${isOpen ? "justify-end" : "justify-center"}`}>
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-slate-800 transition bg-transparent"
        >
          <i className={`fas ${isOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 px-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg 
              hover:bg-slate-800 transition-colors
              ${!isOpen ? "justify-center" : ""}`}
          >
            {/* Mostrar icono solo cuando isOpen */}
            {isOpen && <i className={`fas ${item.icon} w-5 text-center`} />}
            
            {/* Mostrar texto solo cuando isOpen */}
            {isOpen && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;