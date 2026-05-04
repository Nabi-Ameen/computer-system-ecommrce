import React from 'react'
import { Field } from 'formik';
const InputField = ({ name, type }) => {
    return (
        <div>
            <Field name={name} type={type} className="bg-gray-200 px-2 py-4 rounded-md w-full" />
        </div>
    )
}

export default InputField