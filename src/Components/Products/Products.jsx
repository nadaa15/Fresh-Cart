import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Products() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  let { addToCart } = useContext(CartContext);
  let { addToWishList } = useContext(WishListContext);
  console.log(searchValue);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setRecentProducts(data.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our products - Fresh-Cart</title>
        <meta
          name="description"
          content="Explore our wide range of products available for purchase."
        />
        <meta
          name="keywords"
          content="products, ecommerce, shop, buy, online shopping"
        />
      </Helmet>
      {recentProducts.length !== 0 ? (
        <>
          <div className="bg-gray-200 text-center text-xl font-bold w-full mt-20 overflow-hidden bg-opacity-50 h-52 relative">
            <ul className="container flex justify-between absolute">
              <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_1s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_7s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-20 h-20 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-26 h-26 bg-main bg-opacity-20 animate-[floating_10s_3s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-16 h-16 bg-main bg-opacity-20 animate-[floating_10s_7s_ease_infinite] rounded -translate-y-[180px]"></li>
              <li className="w-14 h-14 bg-main bg-opacity-20 animate-[floating_10s_5s_ease_infinite] rounded -translate-y-[180px]"></li>
            </ul>
            <div className="flex justify-center items-center h-full z-50">
              <h2>Products</h2>
            </div>
          </div>
          <div className="mt-5 flex justify-center items-center">
            <input
              autoComplete="off"
              id="search"
              className="bg-gray-200 rounded-3xl px-6 py-2 w-3/4 md:w-1/2 max-xs:w-full "
              type="text"
              value={searchValue}
              placeholder="Search products..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="max-w-[90%] mx-auto flex flex-wrap justify-center items-center">
            {recentProducts
              .filter((product) =>
                product.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="card w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4 cursor-pointer">
                  <div className="card-img relative group">
                    <img
                      className="w-full object-cover"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <div className="layer absolute w-full top-14 left-0 h-full flex justify-center items-end p-4 opacity-0 group-hover:top-0 group-hover:opacity-100 transition-all duration-300">
                      <i
                        onClick={() => addToWishList(product.id)}
                        className="fa-solid fa-heart bg-slate-300 p-2 mx-2 hover:bg-main hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                      ></i>
                      <i
                        onClick={() => addToCart(product.id)}
                        className="fa-solid fa-cart-plus bg-slate-300 p-2 mx-2 hover:bg-main hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                      ></i>
                      <Link
                        to={`/productdetails/${product.id}/${product.category.name}`}
                      >
                        <i className="fa-regular fa-eye bg-slate-300 p-2 mx-2 hover:bg-main hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"></i>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-400">{product.category.name}</h3>
                    <h2 className="font-semibold line-clamp-1">
                      {product.title}
                    </h2>
                    <div className="flex flex-wrap justify-between">
                      <p className="text-main font-bold text-md">
                        {product.price} EGP
                      </p>
                      <p>
                        {product.ratingsQuantity}{" "}
                        <i className="fas fa-star text-yellow-500"></i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
