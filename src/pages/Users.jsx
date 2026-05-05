import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

import InputField from '../components/common/InputField';
import Typography from '../components/common/Typography';

const Users = () => {
    const [loader, setLoader] = useState(false);
    const [users, setUsers] = useState([]);
    const [sigleUser, setSingleUser] = useState({});

    console.log("sigleUser", sigleUser)

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:9000/v1/users")
        setUsers(response.data.data)
    }

    const deleteUser = async (id) => {
        const response = await axios.delete(`http://localhost:9000/v1/user/${id}`)
        getAllUsers()
    }

    const getSigleUser = async (id) => {
        const response = await axios.get(`http://localhost:9000/v1/user/${id}`)
        setSingleUser(response?.data?.data)
    }

    const updateUser = async (id, values) => {
        const response = await axios.put(`http://localhost:9000/v1/user/${id}`, values)
        setSingleUser({})
        getAllUsers()
    }

    useEffect(() => {
        getAllUsers()
    }, [sigleUser])



    const createUser = async (values) => {
        setLoader(true)
        const response = await axios.post("http://localhost:9000/v1/user", values)
        setLoader(false)
        getAllUsers()

        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }


    const initialValues = {
        firstName: sigleUser && sigleUser?.firstName || '',
        lastName: sigleUser && sigleUser?.lastName || '',
        email: sigleUser && sigleUser?.email || '',
        password: ''
    }
    return (
        <div>

            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('Required'),
                    lastName: Yup.string()
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                })}
                onSubmit={(values, { resetForm }) => {
                    const updatedBody = values
                    if (sigleUser?.id) {
                        updateUser(sigleUser?.id, updatedBody)
                    } else {
                        createUser(values)
                    }
                    resetForm();
                }}
            >
                {
                    ({ values, handleChange }) => {

                        // console.log("values", values)
                        return (
                            <Form className='flex items-center justify-center my-10'>
                                <div className='w-1/4 space-y-6'>
                                    <Typography varient="h3">Sign Up</Typography>
                                    <Typography varient="small">Upgrade your tech game with us!</Typography>
                                    <div>
                                        <label htmlFor="firstName" className='text-lg'>First Name</label>
                                        <InputField value={values?.firstName} onchange={handleChange} name="firstName" type="text" />
                                        <ErrorMessage name="firstName" />
                                    </div>

                                    <div>
                                        <label htmlFor="image" className='text-lg'>Image</label>
                                        <InputField value={values?.firstName} onchange={handleChange} name="image" type="file" />
                                        <ErrorMessage name="image" />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className='text-lg'>Last Name</label>
                                        <InputField value={values?.lastName} onchange={handleChange} name="lastName" type="text" />
                                        <ErrorMessage name="lastName" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className='text-lg'>Email Address</label>
                                        <InputField value={values?.email} onchange={handleChange} name="email" type="email" />
                                        <ErrorMessage name="email" />
                                    </div>

                                    {!sigleUser?.id && <div>
                                        <label htmlFor="password" className='text-lg'>Password</label>
                                        <InputField name="password" onchange={handleChange} type="password" />
                                        <ErrorMessage name="password" />
                                    </div>}

                                    <button type="submit" className='bg-blue-800 py-6 px-16 rounded-lg text-white'>{loader ? "saving..." : sigleUser?.id ? "Update" : "Submit"}</button>

                                </div>

                            </Form>
                        )
                    }
                }
            </Formik>

            <table class="w-full my-20 border">
                <thead>
                    <tr className='bg-gray-700 text-white text-left'>
                        <th className='p-4'>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => {
                            return (
                                <tr>
                                    <td className='p-4'>{user?.id}</td>
                                    <td>{user?.firstName}</td>
                                    <td>{user?.lastName}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role}</td>
                                    <td className='flex items-center gap-4 my-2'>
                                        <div onClick={() => getSigleUser(user?.id)} className='p-2 bg-green-800 text-white rounded-md cursor-pointer'>
                                            <MdModeEdit size={18} />
                                        </div>
                                        <div onClick={() => deleteUser(user?.id)} className='p-2 bg-red-800 text-white rounded-md cursor-pointer'>
                                            <FaTrash size={18} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Users