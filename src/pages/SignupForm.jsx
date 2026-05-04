import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/common/InputField';
import Typography from '../components/common/Typography';
import axios from "axios";

const SignupForm = () => {
    const [loader, setLoader] = useState(false);

    const createUser = async (values) => {
        setLoader(true)
        const response = await axios.post("http://localhost:9000/v1/user", values)
        setLoader(false)
    }
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={(values) => {
                createUser(values)

            }}
        >
            <Form className='flex items-center justify-center my-10'>
                <div className='w-1/4 space-y-6'>
                    <Typography varient="h3">Sign Up</Typography>
                    <Typography varient="small">Upgrade your tech game with us!</Typography>
                    <div>
                        <label htmlFor="firstName" className='text-lg'>First Name</label>
                        <InputField name="firstName" type="text" />
                        <ErrorMessage name="firstName" />
                    </div>

                    <div>
                        <label htmlFor="lastName" className='text-lg'>Last Name</label>
                        <InputField name="lastName" type="text" />
                        <ErrorMessage name="lastName" />
                    </div>

                    <div>
                        <label htmlFor="email" className='text-lg'>Email Address</label>
                        <InputField name="email" type="email" />
                        <ErrorMessage name="email" />
                    </div>

                    <div>
                        <label htmlFor="password" className='text-lg'>Password</label>
                        <InputField name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>

                    <button type="submit" className='bg-blue-800 py-6 px-16 rounded-lg text-white'>{loader ? "saving..." : "Submit"}</button>

                </div>

            </Form>
        </Formik>
    );
};

export default SignupForm