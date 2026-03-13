import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

const Button: React.FC<ButtonProps> = ({ children, label, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    {children || label}
  </button>
);

export default Button;