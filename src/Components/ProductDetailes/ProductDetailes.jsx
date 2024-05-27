import React, { useEffect, useState } from "react";
// import style from "./ProductDetailes.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetailes() {
  //slick slider
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

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
        <>
          <Helmet>
            <meta charSet="utf-8" />
              <title>{ details.title}</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className="row align-items-center mt-5">
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((image) => (
                  <img
                    key={details.id}
                    className="w-100"
                    src={image}
                    alt={details.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-7">
              <div className="details">
                <h3 className="h5 ">{details.title}</h3>
                <p className="py-3">{details.description}</p>
                <span className="font-sm text-main">
                  {details.category.name}
                </span>
                <div className="d-flex py-3 justify-content-between align-items-center">
                  <span className="font-sm ">{details.price}EGP</span>
                  <span className="font-sm ">
                    <i className="fas fa-star rating-color me-1"></i>
                    {details.ratingsAverage}
                  </span>
                </div>
                <button className="btn bg-main text-main-light w-100 btn-sm">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
