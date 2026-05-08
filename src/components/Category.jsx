import { ErrorMessage, Form, Formik } from "formik";
import InputField from "./common/InputField";
import Typography from "./common/Typography";
import axios from "axios";
import * as Yup from 'yup';
import { useState } from "react";

const Category = () => {
    const [loader, setLoader] = useState(false)
    const initialValues = {
        categoryName: '',
    };

    const createCategory = async (values) => {
        setLoader(true)
        const response = await axios.post("http://localhost:9000/v1/category", values)
        setLoader(false)
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Yup.object({
                categoryName: Yup.string().required('Required'),
            })}
            onSubmit={(values, { resetForm }) => {
                createCategory(values)
                resetForm()
            }}
        >
            {({ values, handleChange }) => (
                <Form className='space-y-6 w-1/2'>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography varient="h3">Add Category</Typography>

                    </div>

                    <div>
                        <label htmlFor="categoryName" className='text-lg font-medium block mb-2'>Category</label>
                        <InputField value={values?.categoryName} onchange={handleChange} name="categoryName" type="text" />
                        <ErrorMessage name="categoryName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>


                    <button type="submit" className='bg-blue-800 hover:bg-blue-900 py-3 px-6 rounded-lg text-white transition w-full'>
                        {loader ? "loading..." : "Save"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Category