import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-500 font-bold mb-4 text-3xl">
        Bienvenido a Front Bancoudea
      </h1>
      <p className="text-gray-700">
        En el panel izquierdo puedes consultar clientes, realizar transacciones y revisar el historial. ¡Explora las funcionalidades y gestiona tus finanzas de manera eficiente!
      </p>
    </div>
  );
};

export default HomePage;
