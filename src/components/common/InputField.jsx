import React from 'react'
import { Field } from 'formik';
const InputField = ({ name, type, value, onchange }) => {
    return (
        <div>
            <input name={name} type={type} value={value} onChange={onchange} className="bg-gray-200 px-2 py-4 rounded-md w-full" />
        </div>
    )
}

export default InputField