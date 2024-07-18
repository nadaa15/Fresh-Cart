import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function RelatedCatgSlider({category}) {
  const [relatedProducts, setRelatedProducts] = useState([]);
const settings = {
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 500,
  cssEase: "linear",
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
};

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let related = data.data.filter(
          (product) => product?.category?.name === category
        );
        setRelatedProducts(related);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getRelatedProducts(category);
  }, [category]);

  return (
    <>
      <div className="container">
        <h2 className="font-bold text-2xl text-main">Related Peoducts</h2>
        <Slider {...settings}>
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="card w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4"
            >
              <div className="card-img relative group">
                <img
                  className="w-full object-cover"
                  src={product.imageCover}
                  alt=""
                />
                <div className="layer absolute w-full top-14 left-0 h-full flex justify-center items-end p-4 opacity-0 group-hover:top-0 group-hover:opacity-100 transition-all duration-300">
                  <i className="fa-regular fa-heart bg-slate-300 p-2 mx-2 hover:bg-main hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"></i>
                  <i className="fa-solid fa-cart-plus bg-slate-300 p-2 mx-2 hover:bg-main hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"></i>
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
        </Slider>
      </div>
    </>
  );
}
