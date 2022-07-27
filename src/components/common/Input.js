import React from "react";

export default function Input({ label, value, onChange, ...props }) {
  return (
    <div className='pt-4'>
      <label className='label'>{label}</label>
      <input className='input' value={value} onChange={onChange} {...props} />
    </div>
  );
}
