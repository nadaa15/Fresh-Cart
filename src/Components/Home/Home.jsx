import React, { useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    const [first, setfirst] = useState('')
    useEffect(() => {

    }, [])
    
  return (
    <>
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
      </div>
    </>
  );
}
