import React from "react";
import style from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";

export default function CategoriesSlider() {

  function getCatigores() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery('Categories', getCatigores)
  



    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
    };

  return (
    <>
      <div className="row ">
        <Slider {...settings}>
          {data?.data.data.map((category, index) => (
            <div key={index} className="col-md-2">
              <div className="img">
                <img
                  src={category.image}
                  height={200}
                  className="w-100"
                  alt={category.name}
                />
                <p>{category.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
