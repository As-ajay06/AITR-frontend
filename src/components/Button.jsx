import React from "react";

const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  className = "",
  children,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 shadow-md hover:shadow-lg",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-md hover:shadow-lg",
    outline: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 active:bg-blue-100",
    ghost: "text-blue-600 bg-transparent hover:bg-blue-50 active:bg-blue-100",
    link: "text-blue-600 bg-transparent hover:text-blue-700 underline-offset-4 hover:underline p-0",
  };

  // Size styles
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-6 py-2.5 text-base",
    large: "px-8 py-3 text-lg",
  };

  // Disabled styles
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer transition-all duration-200";

  const baseStyles = `
    font-semibold
    rounded-lg
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-blue-500
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.medium}
    ${disabledStyles}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      {...props}
    >
      {children || label}
    </button>
  );
};

export default Button;