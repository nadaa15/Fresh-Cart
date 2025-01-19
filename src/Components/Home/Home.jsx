import React, { useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
    const [first, setfirst] = useState('')
    useEffect(() => {

    }, [])
    
  return (
    <>
      <Helmet>
        <title>Home - Fresh-Cart</title>
        <meta
          name="description"
          content="Welcome to Fresh-Cart! Explore the latest deals, featured products, and categories. Shop now for the best online shopping experience."
        />
        <meta
          name="keywords"
          content="ecommerce, online shopping, deals, featured products, best prices, categories"
        />
      </Helmet>
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
      </div>
    </>
  );
}
