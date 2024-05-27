import React, { useEffect, useState } from "react";
// import style from "./Categories.module.css";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Categories() {
  // const [cat, setCat] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function getProductsCat() {
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/categories`
  //   );
  //   setCat(data.data);
  //   setLoading(false);
  //   console.log(data.data);
  // }

  // useEffect(() => {
  //   getProductsCat();
  // }, []);

  //react query

  function getCatigores() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data ,isLoading} = useQuery("Categories", getCatigores);
  



  return (
    <>
      {isLoading ? (
        <div className="row justify-content-center align-items-center vh-100 ">
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
        <div className="row gy-4 mt-5">
          {data?.data.data.map((category) => (
            <div key={category.id} className="col-md-4">
              <div className="cat-container">
                <div className="cat-img product ">
                  <img
                    src={category.image}
                    className="w-100 img"
                    height={400}
                    alt={category.name}
                  />
                  <h3 className="h2 text-main text-center pt-4">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
