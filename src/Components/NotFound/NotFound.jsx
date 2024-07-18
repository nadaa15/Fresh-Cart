import React, { useEffect, useState } from 'react'
import img from "../../assets/images/404-error.jpg.webp";

export default function NotFound() {
    const [first, setfirst] = useState('')
    useEffect(() => {

    }, [])
    
  return (
    <>
      <div className="container flex justify-center items-center">
        <img className='w-1/2' src={img} alt="404 image" />
    </div>
    </>
  )
}
