import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Cart() {
  
  let { getCartItems, removeCartItem, updateCartItem, cartItems, setcartItems, clearCartItem} = useContext(CartContext);
  
 
    useEffect(() => {
        getCartItems()
    }, [])
  

  async function updateItem(productId, count) {
    if (count < 1) {
       removeCartItem(productId)
     }
     let response = await updateCartItem(productId,count);
     setcartItems(response?.data);
     console.log(response?.data);
   }
    
  return (
    <>
      {cartItems === null ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="bg-gray-200 text-center text-xl font-bold w-full mt-20 overflow-hidden bg-opacity-50 h-52 relative">
            <ul className="container flex justify-between absolute">
              <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_1s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_7s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-26 h-26 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_7s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-14 h-14 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
            </ul>
            <div className="flex justify-center items-center h-full z-50">
              <h2>Shopping Cart</h2>
            </div>
          </div>
          {cartItems.length === 0 || cartItems.numOfCartItems === 0 ? (
            <>
              <div className="bg-gray-200 p-12 container flex flex-col justify-center items-center rounded">
                <h3 className="text-lg font-bold mb-6">
                  There are no items yet
                </h3>
                <Link
                  to="/"
                  className="bg-main px-4 py-2 text-white text-sm rounded-lg "
                >
                  Add items to cart
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="container relative overflow-x-auto shadow-md sm:rounded-lg mt-28">
                <table className="w-full text-sm text-center text-gray-500 ">
                  <thead className="text-base  text-gray-900 uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.data.products.map((product) => (
                      <>
                        <tr
                          key={product._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="p-4">
                            <img
                              src={product?.product.imageCover}
                              className="w-8 md:w-16 max-w-full max-h-full ms-10"
                              alt={product?.product.title}
                            />
                          </td>
                          <td className="px4 py-2 font-semibold text-gray-600 dark:text-white">
                            {product?.product.title}
                          </td>
                          <td className="px4 py-2">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() =>
                                  updateItem(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }
                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <div>
                                <input
                                  type="number"
                                  id="first_product"
                                  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder={product.count}
                                  required
                                />
                              </div>
                              <button
                                onClick={() =>
                                  updateItem(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px4 py-2 font-semibold text-gray-900 dark:text-white">
                            {product.price}EGP
                          </td>
                          <td className="px4 py-2">
                            <span
                              className="font-bold text-main dark:text-main hover:underline text-center cursor-pointer"
                              onClick={() => removeCartItem(product.product.id)}
                            >
                              Remove
                            </span>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                  <div className="py-6 w-full">
                    <p className="text-center font-bold text-black text-lg">
                      Total Price:{" "}
                      <span className='text-gray-500 font-medium'>{cartItems?.data?.totalCartPrice}</span>
                    </p>
                  </div>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4 w-[90%] mx-auto">
                <Link
                  to="/"
                  className="bg-main text-white  px-4 py-3 font-semibold text-xs md:text-sm cursor-pointer rounded-lg"
                >
                  <i className="fas fa-arrow-left"></i> Continue shopping
                </Link>
                <span
                  onClick={clearCartItem}
                  className="text-main font-semibold text-base cursor-pointer underline underline-offset-1"
                >
                  Clear all items
                </span>
              </div>
              <div className="flex justify-center items-center mt-6">
                <Link
                  to="/checkout"
                  className="bg-main text-white px-4 py-3 font-semibold text-sm cursor-pointer rounded-lg"
                >
                  CheckOut <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
