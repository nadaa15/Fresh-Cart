import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';
import { WishListContext } from '../../../Context/WishlistContext';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function BrandProducts() {
  const [products, setProducts] = useState(null);
  let { addToCart } = useContext(CartContext);
    let { addToWishList } = useContext(WishListContext);

  let { id, name } = useParams();


   function getBrandProducts(id) {
     axios
       .get(
         `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
       )
       .then(({ data }) => {
         console.log(data.data);
         setProducts(data.data)
       })
       .catch((error) => {
         console.log(error);
       });
   }

   useEffect(() => {
     getBrandProducts(id);
   }, [id,name]);

  
    
  return (
    <>
      <Helmet>
        <title>{`${name} - Shop by Brand`}</title>
        <meta
          name="description"
          content={`Explore the latest products in the ${name} brand. Find top-quality items and great deals on Fresh-Card.`}
        />
      </Helmet>
      {products === null ? (
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
              <h2>Products from {name}</h2>
            </div>
          </div>
          {products.length === 0 ? (
            <>
              <div className="bg-gray-200 p-12 container flex flex-col justify-center items-center rounded">
                <h3 className="text-lg font-bold">
                  There are no items from this brand
                </h3>
              </div>
            </>
          ) : (
            <div className="container flex flex-wrap justify-center items-center">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="card w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4 cursor-pointer"
                >
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
          )}
        </>
      )}
    </>
  );
}
