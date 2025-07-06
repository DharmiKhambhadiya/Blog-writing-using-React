import React from "react";
import "./css/select.css";

function Select({ label, options = [], className = "", ...props }) {
  return (
    <div className={`select-group ${className}`}>
      {label && <label className="select-label">{label}</label>}
      <select className="select-field" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
