import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';
import toast, { LoaderIcon } from 'react-hot-toast';
import { WishListContext } from '../../../Context/WishlistContext';
import Loading from '../Loading/Loading';

export default function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  let { addToCart } = useContext(CartContext);
  let { addToWishList } = useContext(WishListContext);

  
function getProducts() {
  axios
    .get("https://ecommerce.routemisr.com/api/v1/products")
    .then(({ data }) => {
      
      setRecentProducts(data.data)
    })
    .catch((error) => {});
}
    useEffect(() => {
      getProducts()
    }, [])
    
  return (
    <>
      {recentProducts.length !== 0 ?  (
        <div className="flex flex-wrap justify-center items-center">
          {recentProducts.map((product) => (
            <div className="card w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4 cursor-pointer">
              <div className="card-img relative group">
                <img
                  className="w-full object-cover"
                  src={product.imageCover}
                  alt=""
                />
                <div className="layer absolute w-full top-14 left-0 h-full flex justify-center items-end p-4 opacity-0 group-hover:-top-2 group-hover:opacity-100 transition-all duration-300">
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
                <h2 className="font-semibold line-clamp-1">{product.title}</h2>
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
      ):(
        <Loading />
      ) }
    </>
  );
}
