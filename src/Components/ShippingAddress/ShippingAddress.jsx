import React, { useContext } from "react";
// import style from "./ShippingAddress.module.css";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function ShippingAddress() {
  let { cartId } = useParams();

  const { checkOutSession } = useContext(CartContext);

  async function checkOut(values) {
    let { data } = await checkOutSession(cartId, values);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkOut,
  });

  return (
    <>
      <h2 className="fw-bold mt-4 text-center">Confimation Data </h2>
      <div className="w-75 mx-auto ">
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 bg-main-light border rounded p-3"
        >
          <label htmlFor="details" className="ps-2 pt-3">
            Details
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="details"
            name="details"
            className="form-control  mb-3"
          />

          <label htmlFor="phone" className="ps-2">
            Phone
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="phone"
            name="phone"
            className="form-control mb-3 "
          />

          <label htmlFor="city" className="ps-2">
            City
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="city"
            name="city"
            className="form-control mb-3 "
          />
          <div className="button-container text-center">
            <button className="btn bg-main text-light w-75 py-2 mt-3 ">
              CheckOut
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
