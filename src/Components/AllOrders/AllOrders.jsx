import React, { useContext, useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";


export default function AllOrders() {
  // const [loading, setLoading] = useState(true);

  
  return (
    <>
      <div className="bg-main-light p-5 my-5">
        <h2 className="text-center">Your Orders</h2>
      </div>
      <div className="mx-auto text-center">
        <Link to={'/'}>
          <button className="btn bg-main text-light text-center mb-5">
            GO Back To Shopping
          </button>
        </Link>
      </div>
    </>
  );
}
