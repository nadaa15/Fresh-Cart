import React, { useEffect, useState } from 'react'
import img1 from "../../assets/images/img1.webp"
import img2 from "../../assets/images/img2.png"
import img3 from "../../assets/images/img3.png"
import Slider from "react-slick";


export default function MainSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    arrows: false,
  };
    useEffect(() => {

    }, [])
    
  return (
    <>
      <div className="md:flex flex-wrap mb-10">
        <div className="w-full md:w-8/12">
          <Slider {...settings}>
            <img src={img1} className="w-full h-[500px] object-cover" alt="" />
            <img src={img2} className="w-full h-[500px] object-cover lg:object-fill" alt="" />
            <img src={img3} className="w-full h-[500px] object-cover lg:object-fill" alt="" />
          </Slider>
        </div>
        <div className="flex w-full md:inline-block md:w-4/12">
          <img src={img2} className="md:w-full w-1/2 h-[250px] object-cover lg:object-fill" alt="" />
          <img src={img3} className="md:w-full w-1/2 h-[250px] object-cover md:object-fill" alt="" />
        </div>
      </div>
    </>
  );
}
