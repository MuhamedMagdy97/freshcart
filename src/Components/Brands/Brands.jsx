import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";

// import style from "./Brands.module.css";

export default function Brands() {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrand(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getAllBrands();
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
            <title>Brands</title>
          </Helmet>
          <div className="row gy-4">
            {brand.map((brand) => (
              <div className="col-md-3 mt-5" key={brand.name}>
                <div className="product">
                  <img src={brand.image} alt={brand.name} />
                  <h2 className="h4 text-center text-main">{brand.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
