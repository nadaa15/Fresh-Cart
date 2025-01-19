import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import RelatedCatgSlider from '../RelatedCatgSlider/RelatedCatgSlider';
import { CartContext } from '../../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState([])
  let {addToCart} = useContext(CartContext)
  
  let { id, category } = useParams();
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay:true,
  };
  
  function getProductDetails(id) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      )
      .then(( {data} ) => {
        setProductDetails(data.data);
      })
      .catch((error) => {});
  }
    
    useEffect(() => {
      getProductDetails(id);
    }, [id, category])
  
  
  return (
    <>
      {productDetails.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>{`${productDetails.title} - Fresh-Cart`}</title>
            <meta name="description" content={productDetails.description} />
          </Helmet>
          <div className="flex justify-center items-center mb-10 container">
            <div className="md:flex justify-center items-center gap-5 w-[75%]">
              <div className="card-img mb-4 w-full md:w-1/3 md:mb-0">
                <Slider {...settings}>
                  {productDetails?.images.map((src) => (
                    <img
                      className="w-full object-cover"
                      src={src}
                      alt={productDetails?.title}
                    />
                  ))}
                </Slider>
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h1 className="text-slate-900 font-bold mb-4">
                  {productDetails?.title}
                </h1>
                <p className="font-light mb-4">{productDetails?.description}</p>
                <div className="flex flex-col gap-3">
                  <p className="text-main font-bold text-md">
                    Price:{" "}
                    <span className="text-slate-700 font-semibold">
                      {productDetails?.price} EGP
                    </span>
                  </p>
                  <p className="text-main font-bold text-md">
                    Rating:{" "}
                    <span className="text-slate-700 font-semibold">
                      {productDetails?.ratingsQuantity}
                    </span>{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </p>
                  <p className="text-main font-bold text-md">
                    Quantity:{" "}
                    <span className="text-slate-700 font-semibold">
                      {productDetails?.quantity}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => addToCart(id)}
                  className="bg-main px-4 py-2 mt-6 text-white"
                >
                  Add to cart <i className="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <RelatedCatgSlider category={category} />
        </>
      )}
    </>
  );
  }
