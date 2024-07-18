import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishListItems, setWishListItems] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((response) => {
        toast.success(response?.data.message);
        setWishListItems(response.data);
      })
      .catch((err) => {
        toast.error(response?.data.message);
      });
  }
  function getWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => {
        setWishListItems(response.data);
        console.log(response.data);
      })
      .catch((err) => {
          console.log(err);
      });
  }

  function removeWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
                toast.success(response?.data.message);

          getWishlist()
          if (wishListItems.count === 0) {
            setWishListItems([])
          }
        console.log(response?.data);
      })
      .catch((err) => {
        toast.error(response?.data.message);
      });
  }

  

  return (
    <>
      <WishListContext.Provider
        value={{
          addToWishList,
          wishListItems,
          setWishListItems,
          getWishlist,
          removeWishlistItem,
        }}
      >
        {props.children}
      </WishListContext.Provider>
    </>
  );
}
