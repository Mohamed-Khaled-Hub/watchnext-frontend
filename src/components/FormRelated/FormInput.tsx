'use client'

// Core
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
// Types
import { FormInputProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/FormRelated/FormInput.css'

export default function FormInput({
    label,
    id,
    type = 'text',
    isPassword = false,
    className = '',
    ...props
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
        <div className='form-input-group'>
            <label htmlFor={id} className='form-input-group__label'>
                {label}
            </label>
            <div className='form-input-group__control-wrapper'>
                <input
                    id={id}
                    type={inputType}
                    className={`form-input-group__input ${
                        isPassword ? 'form-input-group__input--has-icon' : ''
                    } ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type='button'
                        tabIndex={-1}
                        className='form-input-group__toggle-btn'
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? (
                            <FiEyeOff size={18} />
                        ) : (
                            <FiEye size={18} />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
