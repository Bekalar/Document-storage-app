import React from 'react';
import './css/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  outline,
  rounded,
  size = 'md',
  children,
  className = '',
  ...props
}) => {

  const classes = [
    'button-custom',
    primary && 'button-primary',
    secondary && 'button-secondary',
    success && 'button-success',
    danger && 'button-danger',
    outline && 'button-outline',
    rounded && 'button-rounded',
    size && `button-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
