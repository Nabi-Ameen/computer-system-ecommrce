import { ErrorMessage, Form, Formik } from "formik";
import InputField from "./common/InputField";
import Typography from "./common/Typography";
import axios from "axios";
import * as Yup from 'yup';

const Category = () => {
    const initialValues = {
        category: '',
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Yup.object({
                category: Yup.string().required('Required'),
            })}
            onSubmit={(values, { resetForm }) => {
                console.log("values", values)
            }}
        >
            {({ values, handleChange }) => (
                <Form className='space-y-6 w-1/2'>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography varient="h3">Add Category</Typography>

                    </div>

                    <div>
                        <label htmlFor="category" className='text-lg font-medium block mb-2'>Category</label>
                        <InputField value={values?.category} onchange={handleChange} name="category" type="text" />
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                    </div>


                    <button type="submit" className='bg-blue-800 hover:bg-blue-900 py-3 px-6 rounded-lg text-white transition w-full'>
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Category