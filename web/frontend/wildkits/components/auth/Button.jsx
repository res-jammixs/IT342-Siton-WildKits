'use client';

import React from 'react';

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  className = '',
}) {
  const baseStyles = 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `
      bg-gradient-to-r from-[#8B0000] to-[#7A0000] 
      text-white 
      hover:from-[#7A0000] hover:to-[#6A0000] 
      focus:ring-red-500
      disabled:from-gray-400 disabled:to-gray-500 
      disabled:cursor-not-allowed 
      disabled:opacity-60
      shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-white 
      text-[#8B0000] 
      border-2 border-[#8B0000] 
      hover:bg-gray-50 
      focus:ring-red-500
      disabled:border-gray-400 
      disabled:text-gray-400 
      disabled:cursor-not-allowed
    `,
    outline: `
      bg-transparent 
      text-gray-700 
      border border-gray-300 
      hover:bg-gray-50 
      focus:ring-gray-300
      disabled:text-gray-400 
      disabled:cursor-not-allowed
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}
