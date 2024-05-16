import React, { useEffect, useState } from "react";
// import style from "./FeaturedProducts.module.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";


export default function FeaturedProducts() {
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(true)
async function getProducts() {
  let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  setProducts(data.data);
  setLoading(false)
}
  useEffect(() => {
    getProducts();
},[])


  return (
    <>
      {loading ? (
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
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 ">
                <Link to={`/ProductDetailes/${product.id}`}>
                <div className="product my-3 p-2">
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
                  <button className="btn bg-main text-main-light w-100 btn-sm">
                    Add To Cart
                  </button>
                </div>
            </Link>
              </div>
          ))}
        </div>
      )}
    </>
  );
  
}
