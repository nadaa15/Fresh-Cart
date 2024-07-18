import { useContext, useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Brands from './Components/Brands/Brands';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from '../Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from '../Context/CartContext';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Resetcode from './Components/Resetcode/Resetcode';
import Resetpassword from './Components/Resetpassword/Resetpassword';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from '../Context/WishlistContext';
import Loading from './Components/Loading/Loading';

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandproducts/:id/:name",
        element: (
          <ProtectedRoute>
            <BrandProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoryproducts/:id/:name",
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "resetcode", element: <Resetcode /> },
      { path: "resetpassword", element: <Resetpassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
 

  return (
    <>
      <WishListContextProvider>
        <CartContextProvider>
          <UserContextProvider>

            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
    </>
  );
}

export default App
