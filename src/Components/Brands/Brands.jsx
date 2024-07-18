import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        setBrands(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {brands.length === 0 ? (
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
              <h2>Brands</h2>
            </div>
          </div>
          <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {brands.map((brand) => (
              <Link to={`/brandproducts/${brand._id}/${brand.name}`}>
                <div className="card cursor-pointer border border-gray-300 rounded-lg p-4 hover:shadow-3xl transition-all duration-500">
                  <div className="card-img relative">
                    <img
                      className="w-full h-full object-cover"
                      src={brand.image}
                      alt={brand.name}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-main text-lg">{brand.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
