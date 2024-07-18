import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import { CartContext } from '../../../Context/CartContext';

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cartItems, getCartItems } = useContext(CartContext);
  let navigate = useNavigate()
  
  function handleLogout() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login")
    
  }

  useEffect(() => {
    getCartItems()
  }, [])
  

    
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <div>
            <NavLink className="flex items-center justify-center gap-3" to="">
              <i className="fa-solid fa-star-of-life fa-xl text-main animate-[spinner_3s_ease-in-out_infinite] "></i>
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                Freshcart
              </span>
            </NavLink>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex flex-wrap justify-center items-center gap-10">
              <NavLink to="cart">
                {userLogin!==null?<i className="relative fa-solid fa-cart-shopping fa-lg text-zinc-700 hover:text-main transition-all duration-300 cursor-pointer">
                  <div className="absolute bg-main w-4 h-4 -top-5 -right-2 text-white flex justify-center items-center text-[10px] rounded-full">
                    {cartItems === null ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      cartItems.numOfCartItems || 0
                    )}
                  </div>
                </i>:null}
              </NavLink>
              <div className="flex flex-wrap justify-center items-center gap-5">
                <div className="relative group">
                  <i className="fa-regular fa-user fa-lg text-zinc-700 hover:text-main transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-angle-down fa-xs absolute bottom-1/3 right-5 "></i>
                  </i>
                  <div className="absolute -bottom-32 -left-16 p-4 font-medium border border-gray-100 rounded-lg bg-gray-50 opacity-0 group-hover:opacity-100 group-hover:-bottom-28 transition-all duration-300">
                    <ul>
                      <li>
                        <NavLink
                          to="register"
                          className="block px-6 py-1 mb-2 text-gray-900 hover:bg-main hover:text-white hover:rounded-lg transition-all duration-200"
                        >
                          Signup
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="login"
                          className="block px-6 py-1 text-gray-900 hover:bg-main hover:text-white hover:rounded-lg transition-all duration-200"
                        >
                          Login
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <i
                  onClick={handleLogout}
                  className="fa-solid fa-right-from-bracket fa-lg text-zinc-700 hover:text-main transition-all duration-300 cursor-pointer"
                ></i>
              </div>
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1  "
            id="navbar-sticky"
          >
            {userLogin !== null ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) => {
                      return `relative before:bg-main before:h-[2px] before:absolute before:left-0 before:-bottom-1 hover:before:w-full before:transition-all duration-300 cursor-pointer ${
                        isActive ? `before:w-full` : "before:w-0"
                      }`;
                    }}
                  >
                    Wishlist
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}


