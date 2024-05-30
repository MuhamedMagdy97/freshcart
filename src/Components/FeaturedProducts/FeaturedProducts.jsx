import React, { useContext, useEffect, useState } from "react";
// import style from "./FeaturedProducts.module.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  // const [products , setProducts] = useState([])
  // const [loading , setLoading] = useState(true)
  // async function getProducts() {
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //   setProducts(data.data);
  //   setLoading(false)
  // }
  //   useEffect(() => {
  //     getProducts();
  // },[])

  // use react query

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("FeaturedProducts", getProducts, {
    // cacheTime:3000,
    // refetchOnMount: false,
    // refetchOnWindowFocus:false,
    // staleTime:50000,
    // refetchInterval:1000,
    // refetchOnReconnect: false
  });
  // console.log(data?.data.data)

  let { addToCart } = useContext(CartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    console.log(data);
    toast.success(data.message, {
      duration: 2000,
    });
  }

  return (
    <>
      <h2 className="h1 fw-bolder mt-5">Featured Products </h2>
      {isLoading ? (
        <div className="row justify-content-center align-items-center vh-100">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="row gy-4">
          {data?.data.data.map((product) => (
            <div key={product.id} className="col-lg-3 ">
              <div className="product my-3 p-2">
                <Link to={`/ProductDetailes/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt="product.title"
                  />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                    <span className="font-sm ">{product.price}EGP</span>
                    <span className="font-sm ">
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => postToCart(product.id)}
                  className="btn bg-main text-main-light w-100 btn-sm"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
