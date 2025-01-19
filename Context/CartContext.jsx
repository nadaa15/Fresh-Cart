import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartItems, setcartItems] = useState(null);
    let headers = {
      token: localStorage.getItem("userToken"),
    };

    function addToCart(productId) {
         return axios
           .post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId}, { headers })
             .then((response) => {
               toast.success(response?.data.message);
               setcartItems(response.data)
           })
             .catch((err) => {
               toast.error(err?.response?.data.message);
           });
    }
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setcartItems(response.data);
        })
      .catch((err) => {
        if (err.response.data.message.includes("No cart")) {
                  setcartItems([]);
        }
            });
  }
  
  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        setcartItems(response?.data);
        console.log(response?.data);
      })
      .catch((err) => {
        toast.error(response?.data.message);
      })
  }
  function clearCartItem() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        if (response.data.message === "success") {
          setcartItems([]);

        }
        console.log(response?.data);
      })
      .catch((err) => {
        toast.error(response?.data.message)
      })
  }

     function updateCartItem(productId, count) {
       return axios
         .put(
           `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
           { count },
           {
             headers,
           }
         )
         .then((response) => response)
         .catch((err) => err);
     }

  return (
    <>
      <CartContext.Provider value={{addToCart,getCartItems,removeCartItem,updateCartItem,cartItems,setcartItems,clearCartItem}}>{props.children}</CartContext.Provider>
    </>
  );
}
