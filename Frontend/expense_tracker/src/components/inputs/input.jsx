import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, label, placeholder, type}) => {
  
  const [showpassword, setShowpassword] = useState(false);
  const toggleShowPassword = () => {
    setShowpassword(!showpassword);
  }

  return (
    <div>
        <label className='text-[12px] text-slate-800'>{label}</label>
        <div className='input-box'>
          <input
          type = {type == 'password' ? showpassword ? 'text' : 'password' : type}
          placeholder = {placeholder}
          className='w-full bg-transparent outline-none'
          value={value}
          onChange={(e) => onChange(e)}
           />
           {type === 'password' && (
            <>
              {showpassword ?(
                <FaRegEye 
                className='text-primary cursor-pointer'
                onClick={() => {toggleShowPassword()}}/>
           ) : 
           (
              <FaRegEyeSlash 
                className='text-primary cursor-pointer'
                onClick={() => {toggleShowPassword()}}
              />
           )
          }
           </>
            ) }
        </div>
    </div>
  )
}

export default Input