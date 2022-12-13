import React from 'react'

const TextField = ({ value, onChange, onBlur, name, type, placeholder, label, className }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center'>
        <label className=' mb-1 text-marine-blue' htmlFor={name}>{label}</label>
        {className && <span className=' text-red-600 text-sm'>This Field is required</span>}
      </div>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input ${className}`}
        type={type}
        placeholder={placeholder}
        id={name}
      />
    </div>
  )
}

export default TextField