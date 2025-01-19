import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {UserContext} from "../../../Context/UserContext";
import { Helmet } from "react-helmet";


export default function Login() {
    let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      )
      .required("Required"),
  });

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((apiResponse) => {
        setIsLoading(false);
        toast.success("Login Success!");
        localStorage.setItem("userToken", apiResponse.data.token);
        setUserLogin(apiResponse.data.token);
        navigate("/");
        console.log(apiResponse);
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        toast.error(apiResponse?.response?.data?.message);
        console.log(apiResponse);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login - Fresh-Cart</title>
        <meta
          name="description"
          content="Access your Fresh-Cart account to manage orders, track your wishlist, and enjoy a personalized shopping experience."
        />
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-24 max-w-md mx-auto bg-white py-12 px-6 shadow-xl rounded-lg"
      >
        <div className="relative before:absolute before:w-1 before:h-6 before:top-[10px] before:-left-6 before:bg-main">
          <h2 className="text-main text-3xl font-bold mb-8">Login</h2>
        </div>
        <div className="relative mb-8">
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
        <div className="relative mb-8">
          <input
            type="password"
            id="password"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="text-white bg-main hover:bg-opacity-95 rounded-lg font-semibold text-md w-full sm:w-auto px-14 py-2.5 text-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-4">
            Don't have an account?{" "}
            <span className="text-main font-bold">
              <Link to="/register">Register Now</Link>
            </span>
          </p>
          <span className="text-main font-bold mt-4">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </span>
        </div>
      </form>
    </>
  );
}
