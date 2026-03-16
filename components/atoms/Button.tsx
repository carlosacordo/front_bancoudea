import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  classNameContent: string;  
};

const Button: React.FC<ButtonProps> = ({ children, label, classNameContent, ...props }) => (
  <button
    {...props}
    className={classNameContent}
  >
    {children || label}
  </button>
);

export default Button;