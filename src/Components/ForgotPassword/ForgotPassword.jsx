import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";


export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

   function handleForgotPassword(formValues) {
     setIsLoading(true);
     axios
       .post(
         "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
         formValues
       )
       .then(({data}) => {
          setIsLoading(false);
         toast.success(data?.message);
         navigate("/resetcode");
         console.log(data);
       })
       .catch((err) => {
          setIsLoading(false);
         toast.error(err?.response?.data?.message);
         console.log(err);
       });
  }
  
  let signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleForgotPassword,
  });
    useEffect(() => {

    }, [])
    
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-24 max-w-md mx-auto bg-white py-12 px-6 shadow-xl rounded-lg"
      >
        <div className="relative before:absolute before:w-1 before:h-6 before:top-[10px] before:-left-6 before:bg-main">
          <h2 className="text-main text-3xl font-bold">
            Please enter your email
          </h2>
        </div>
        <div className="container relative mb-8">
          <input
            type="email"
            id="email"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className='flex justify-center items-center'>
          <button
            type="submit"
            className="text-white bg-main hover:bg-opacity-95 rounded-lg font-semibold text-md w-full sm:w-auto px-14 py-2.5 text-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
