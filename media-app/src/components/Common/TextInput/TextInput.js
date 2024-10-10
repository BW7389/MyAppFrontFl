import React from 'react';
import './TextInput.css'; // Ensure to import the CSS

const TextInput = ({ label, name, value, onChange, required, type = 'text', placeholder }) => (
  <div className="text-input">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name} // Assign an id for the label to connect with the input
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder} // Add placeholder prop
    />
  </div>
);

export default TextInput;
