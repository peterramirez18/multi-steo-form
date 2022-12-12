import React from 'react'

const TextField = ({ name, type, placeholder, label, className }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center'>
        <label className=' mb-1 text-marine-blue' htmlFor={name}>{label}</label>
        {className && <span className=' text-red-600 text-sm'>This Field is required</span>}
      </div>
      <input className={`input ${className}`} type={type} placeholder={placeholder} />
    </div>
  )
}

export default TextField