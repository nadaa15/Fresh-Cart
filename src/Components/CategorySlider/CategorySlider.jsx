import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Loading from '../Loading/Loading';


export default function CategorySlider() {

  const [categories, setCategories] = useState([]);

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  function getGategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
        console.log(categories);
      })
      .catch((error) => {});
  }
    useEffect(() => {
getGategories()
    }, [])
    
  return (
    <>
      {categories?<><h2 className="text-main font-bold text-lg mb-4">Shop popular categories</h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div className='mb-8'>
            <img
              className="w-full h-[250px] object-cover"
              src={category?.image}
              alt={category?.name}
            />
            <h2 className="pt-4 text-gray-500 font-semibold">
              {category?.name}
            </h2>
          </div>
        ))}
      </Slider></>:<Loading/>}
      
    </>
  );
}
