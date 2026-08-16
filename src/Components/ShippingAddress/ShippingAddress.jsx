import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { getApiErrorMessage } from "../../api/client";

export default function ShippingAddress() {
  const { cartId } = useParams();
  const { checkOutSession } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function checkOut(values) {
    setSubmitting(true);
    setApiError(null);

    try {
      const { data } = await checkOutSession(cartId, values);
      const redirectUrl = data?.session?.url;
      const destination = new URL(redirectUrl);

      if (destination.protocol !== "https:") {
        throw new Error("The payment provider returned an insecure checkout URL.");
      }

      window.location.assign(destination.toString());
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to start checkout. Please try again."));
      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema: Yup.object({
      details: Yup.string().trim().min(3, "Enter at least 3 characters").required("Address details are required"),
      phone: Yup.string().trim().min(8, "Enter a valid phone number").required("Phone is required"),
      city: Yup.string().trim().min(2, "Enter a valid city").required("City is required"),
    }),
    onSubmit: checkOut,
  });

  return <>
    <h1 className="h2 fw-bold mt-4 text-center">Confirmation details</h1>
    <div className="w-75 mx-auto"><form onSubmit={formik.handleSubmit} className="mt-5 bg-main-light border rounded p-3" noValidate>
      {apiError && <div className="alert alert-danger" role="alert">{apiError}</div>}
      {[['details', 'Address details', 'text'], ['phone', 'Phone', 'tel'], ['city', 'City', 'text']].map(([name, label, type]) => <div key={name}>
        <label htmlFor={name} className="ps-2 pt-3">{label}</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name]} type={type} id={name} name={name} className="form-control mb-1" autoComplete={name === 'phone' ? 'tel' : 'address-level2'} />
        {formik.errors[name] && formik.touched[name] && <div className="text-danger small ps-2">{formik.errors[name]}</div>}
      </div>)}
      <div className="button-container text-center"><button disabled={submitting || !(formik.isValid && formik.dirty)} className="btn bg-main text-light w-75 py-2 mt-3">{submitting ? 'Redirecting to payment…' : 'Checkout'}</button></div>
    </form></div>
  </>;
}