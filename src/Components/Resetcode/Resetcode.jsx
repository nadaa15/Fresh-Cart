import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Resetcode() {
const [isLoading, setIsLoading] = useState(false);
let navigate = useNavigate();

function handleResetCode(formValues) {
  setIsLoading(true);
  axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      formValues
    )
    .then(({ data }) => {
      setIsLoading(false);
      toast.success(data?.status);
      navigate("/resetpassword");
      console.log(data);
    })
    .catch((err) => {
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
      console.log(err);
    });
}
let formik = useFormik({
  initialValues: {
    resetCode: "",
  },
  onSubmit: handleResetCode,
});    useEffect(() => {

    }, [])
    
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-24 max-w-md mx-auto bg-white py-12 px-6 shadow-xl rounded-lg"
      >
        <div className="relative before:absolute before:w-1 before:h-6 before:top-[10px] before:-left-6 before:bg-main">
          <h2 className="text-main text-3xl font-bold">
            Please enter the code
          </h2>
        </div>
        <div className="container relative mb-8">
          <input
            type="text"
            id="resetCode"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="resetCode"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Code
          </label>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-main hover:bg-opacity-95 rounded-lg font-semibold text-md w-full sm:w-auto px-14 py-2.5 text-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>{" "}
    </>
  );
}
