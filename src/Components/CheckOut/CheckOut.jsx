import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [orderType, setOrderType] = useState("");
  let { cartItems, setcartItems } = useContext(CartContext);
  let navigate = useNavigate();
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function handleCashOrder(formValues) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartItems?.data?._id}`,
        { formValues },
        { headers }
      )
      .then((response) => {
        console.log("cash");
        console.log(response);

        if (response.data.status === "success") {
          navigate("/allorders");
          setcartItems([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnlineOrder(formValues) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems?.data?._id}?url=https://nadaa15.github.io/Fresh-Cart/`,
        { formValues },
        { headers }
      )
      .then((response) => {
        console.log("online");
        console.log(response.data);
        toast.loading("redirect to pay online");
        if (response.data.status === "success") {
          window.location.href = response.data.session.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (formValues) => {
      if (orderType == "cash") {
        handleCashOrder(formValues);
      } else {
        handleOnlineOrder(formValues);
      }
    },
  });
  return (
    <>
      <div className="bg-gray-200 text-center text-xl font-bold w-full mt-20 overflow-hidden bg-opacity-50 h-52 relative">
        <ul className="container flex justify-between absolute">
          <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_1s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_7s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-26 h-26 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_9s_ease_infinite] rounded -translate-y-[180px]"></li>
          <li className="w-14 h-14 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
        </ul>
        <div className="flex justify-center items-center h-full z-50">
          <h2>CheckOut</h2>
        </div>
      </div>

      <div className="container w-3/4 mx-auto">
        <h2 className="text-lg font-bold my-4">Shipping address</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="shippingAddress.city"
              className="block rounded-lg p-3 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder="Your City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="shippingAddress.phone"
              className="block rounded-lg p-3 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder="Your Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              More Details
            </label>
            <textarea
              type="text"
              id="details"
              name="shippingAddress.details"
              className="block rounded-lg p-3 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-700 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder="More Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <button
            onClick={() => {
              setOrderType("cash");
            }}
            type="submit"
            className="mb-3 text-white me-4 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setOrderType("online");
            }}
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main"
          >
            Online Payment
          </button>
        </form>
      </div>
    </>
  );
}
