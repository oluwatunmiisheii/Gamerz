import React from 'react'

const Input = ({ name, value, onChange, type }) => {
  return (
    <input
      type={type}
      className="form-control"
      name={name}
      id={name}
      value={value}
      readOnly
    />
  );
}

export default Input;