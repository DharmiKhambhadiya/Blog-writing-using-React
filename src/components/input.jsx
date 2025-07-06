import React from "react";
import "./css/input.css";

export const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className="input-field"
        {...props}
      />
    </div>
  );
});
