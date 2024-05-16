import "./App.css";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import ProductDetailes from "./Components/ProductDetailes/ProductDetailes.jsx";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider, { UserContext } from "./Context/UserContext.js";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  let routers = createBrowserRouter([
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
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetailes/:id",
          element: (
            <ProtectedRoute>
              <ProductDetailes />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
