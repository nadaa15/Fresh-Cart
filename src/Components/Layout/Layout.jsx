import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'


export default function Layout() {
    const [first, setfirst] = useState('')
    useEffect(() => {

    }, [])
    
  return (
    <>
      <Navbar />
        <Outlet></Outlet>
      <Footer/>
    </>
  )
}
