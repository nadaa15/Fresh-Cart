import React, { useEffect, useState } from 'react'
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";


export default function Footer() {
    const [first, setfirst] = useState('')
    useEffect(() => {

    }, [])
    
  return (
    <>
      <footer className="bg-gray-100">
        <div className="container p-6">
          <div className="md:flex justify-between items-center">
            <div className="md:w-1/3 w-full mb-4 ">
              <div className="flex items-center justify-start gap-3">
                <i className="fa-solid fa-star-of-life fa-xl text-main"></i>
                <span className="text-2xl font-bold">Freshcart</span>
              </div>
              <div>
                <p className="text-lg font-bold mt-4">
                  Phone:{" "}
                  <span className="text-gray-500 font-semibold text-base">
                    + 185659635
                  </span>
                </p>
                <p className="text-lg font-bold mt-4">
                  Adress:{" "}
                  <span className="text-gray-500 font-semibold text-base">
                    1418 Riverwood Drive, Suite 3245 Cottonwood, CA 96052,
                    United States
                  </span>
                </p>
                <p className="text-lg font-bold mt-4 ">
                  Email:{" "}
                  <span className="text-gray-500 font-semibold text-base">
                    voxo@Gmail.Com
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="md:flex justify-between items-center ">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email..."
                  className="py-2 px-2 w-full md:w-10/12 rounded-lg mb-2"
                />
                <button className="bg-main px-8 py-2 text-white font-semibold rounded-lg">
                  Send
                </button>
              </div>
              <p className="text-lg mt-4 text-gray-500">
                Keep up to date with our latest news and special offers
              </p>
            </div>
          </div>
          <div className="md:flex justify-between items-center mt-6">
            <div className="flex justify-center items-center gap-3 mb-2">
              <h3>We accept:</h3>
              <img src={img1} />
              <img src={img2} />
              <img src={img3} />
              <img src={img4} />
            </div>
            <div>
              <p>© 2022, Voxo Theme. Made with heart by Pixelstrap</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
