import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
        console.log(data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories.length !== 0 ? (
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
              <h2>Categories</h2>
            </div>
          </div>
          <div className="container flex flex-wrap justify-center items-center gap-3">
            {categories.map((category) => (
              <Link to={`/categoryproducts/${category._id}/${category.name}`}>
                <div className="card cursor-pointer border border-gray-300 rounded-lg hover:shadow-3xl transition-all duration-500">
                  <div className="w-[350px] h-[350px] card-img relative">
                    <img
                      className="w-full h-full object-cover"
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                  <div className="text-center p-4">
                    <h3 className="text-main font-bold text-2xl">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
