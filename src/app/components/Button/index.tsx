import React from 'react';
import './style.css';
interface ButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  isDisabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  title,
  type = 'button',
  onClick,
  variant = 'primary',
  isDisabled = false,
}) => {
  return (
    <button
      className={variant}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default Button;


