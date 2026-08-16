import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout/Layout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

const Home = lazy(() => import("./Components/Home/Home.jsx"));
const Cart = lazy(() => import("./Components/Cart/Cart.jsx"));
const Brands = lazy(() => import("./Components/Brands/Brands.jsx"));
const Categories = lazy(() => import("./Components/Categories/Categories.jsx"));
const Products = lazy(() => import("./Components/Products/Products.jsx"));
const Register = lazy(() => import("./Components/Register/Register.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound.jsx"));
const ProductDetails = lazy(() => import("./Components/ProductDetailes/ProductDetailes.jsx"));
const ShippingAddress = lazy(() => import("./Components/ShippingAddress/ShippingAddress.jsx"));
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders.jsx"));

function page(element) {
  return <Suspense fallback={<div className="loading" role="status">Loading page…</div>}>{element}</Suspense>;
}

function protectedPage(element) {
  return page(<ProtectedRoute>{element}</ProtectedRoute>);
}

const router = createBrowserRouter(
  [{
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: protectedPage(<Home />) },
      { path: "brands", element: protectedPage(<Brands />) },
      { path: "categories", element: protectedPage(<Categories />) },
      { path: "products", element: protectedPage(<Products />) },
      { path: "cart", element: protectedPage(<Cart />) },
      { path: "orders", element: protectedPage(<AllOrders />) },
      { path: "shipping-address/:cartId", element: protectedPage(<ShippingAddress />) },
      { path: "products/:id", element: protectedPage(<ProductDetails />) },
      { path: "login", element: page(<Login />) },
      { path: "register", element: page(<Register />) },
      { path: "*", element: page(<NotFound />) },
    ],
  }],
  { basename: process.env.PUBLIC_URL || "/" }
);

export default function App() {
  return <><RouterProvider router={router} /><Toaster /></>;
}