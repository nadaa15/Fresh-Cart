import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { WishListContext } from '../../../Context/WishlistContext';
import { CartContext } from '../../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function WishList() {
  let { getWishlist, removeWishlistItem, wishListItems, setWishListItems } =
    useContext(WishListContext);
    let { addToCart } = useContext(CartContext);


    useEffect(() => {
      getWishlist()
    }, [])
    
  return (
    <>
      {wishListItems === null ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Your Wishlist - Fresh-Cart</title>
            <meta
              name="description"
              content="Save your favorite products in your wishlist for later. Easily add them to your cart or share with friends."
            />
          </Helmet>{" "}
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
              <h2>Your Wishlist</h2>
            </div>
          </div>
          {wishListItems.length === 0 || wishListItems.count === 0 ? (
            <>
              <div className="bg-gray-200 p-12 container flex flex-col justify-center items-center rounded">
                <h3 className="text-lg font-bold mb-6">
                  There are no items yet
                </h3>
                <Link
                  to="/"
                  className="bg-main px-4 py-2 text-white text-sm rounded-lg "
                >
                  Add items to wishlist
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="container relative overflow-x-auto shadow-md sm:rounded-lg mt-28">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
                  <thead className="text-base  text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product Name
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
                    {wishListItems?.data.map((product) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img
                            src={product?.imageCover}
                            className="w-8 md:w-16 max-w-full max-h-full ms-10"
                            alt={product?.title}
                          />
                        </td>
                        <td className="px4 py-2 font-semibold text-gray-600 dark:text-white">
                          {product?.title}
                        </td>
                        <td className="px4 py-2 font-semibold text-gray-900 dark:text-white">
                          {product?.price}EGP
                        </td>
                        <td className="px-4 py-2">
                          <span className="font-bold text-main dark:text-main hover:underline text-center text-lg cursor-pointer">
                            <i
                              onClick={() => removeWishlistItem(product?._id)}
                              className="fa-solid fa-xmark me-3 "
                            ></i>
                            <i
                              onClick={() => {
                                addToCart(product?._id);
                                removeWishlistItem(product?._id);
                              }}
                              className="fa-solid fa-cart-plus"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );}
