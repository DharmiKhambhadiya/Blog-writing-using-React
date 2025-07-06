import React from "react";
import "./css/button.css";

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`custom-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
