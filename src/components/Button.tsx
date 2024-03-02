import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
}

export default function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <button className="" onClick={onClick} {...props}>
      {children}
    </button>
  );
}
