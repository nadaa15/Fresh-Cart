import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function AllOrders() {
  const [orders, setOrders] = useState(null)
  
  let token = localStorage.getItem("userToken")
  const { id } = jwtDecode(token)
  console.log(id);


  function getOrders() {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      )
      .then(({ data }) => {
        console.log(data);
        setOrders(data)
      })
      .catch((error) => { console.log(error); });
  }
  useEffect(() => {
    getOrders();
  }, []);
    
  return (
    <>
      {orders === null ? (
        <Loading />
      ) : (
        <>
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
              <h2>Your Orders</h2>
            </div>
          </div>
          {orders.length === 0 ? (
            <>
              <div className="bg-gray-200 p-12 container flex flex-col justify-center items-center rounded">
                <h3 className="text-lg font-bold mb-6">
                  There are no items yet
                </h3>
                <Link
                  to="/"
                  className="bg-main px-4 py-2 text-white text-sm rounded-lg "
                >
                  Make your first order
                </Link>
              </div>
            </>
          ) : (
            <div>
              {orders.map((order) => (
                <div className="container p-2 border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-400 font-semibold">OrderID</h3>
                      <p className="text-sm">#{order.id}</p>
                    </div>
                    <div className="block sm:flex sm:justify-center sm:items-center">
                      {order.isDelivered ? (
                        <span className="inline-block text-main me-4  font-medium rounded-lg text-base w-full sm:w-auto text-center">
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-block text-main me-4 font-medium rounded-lg text-base w-full sm:w-auto text-center">
                          Under Deliver
                        </span>
                      )}
                      {order.isPaid ? (
                        <span className="inline-block text-main me-4 font-medium rounded-lg text-base w-full sm:w-auto text-center">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-block text-main me-4 font-medium rounded-lg text-base w-full sm:w-auto text-center">
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {order.cartItems.map((item) => (
                      <div className="card mt-2 p-4 cursor-pointer border border-gray-200 rounded-lg">
                        <div className="card-img relative group">
                          <img
                            className="w-full object-cover"
                            src={item.product.imageCover}
                            alt={item.product.title}
                          />
                        </div>
                        <div>
                          <h2 className="font-semibold line-clamp-1">
                            {item.product.title}
                          </h2>
                          <p className="text-main font-bold text-md">
                            {item.price} EGP
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
