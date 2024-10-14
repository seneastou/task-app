import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border bg-blue-800 hover:bg-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${className}`}
    >
      {children}
    </button>
  );
}