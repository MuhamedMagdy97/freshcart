import React, { useState } from "react";
import { useFormik } from "formik";
import cartPic from "../../Assets/images/register.jpg";
import * as Yup from "yup";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  async function registerSubmit(values) {
    setLoading(true);
    setApiError(null);

    try {
      const { data } = await apiClient.post("/auth/signup", values);

      if (data?.message === "success") {
        toast.success("Account created. Please sign in.");
        navigate("/login", { replace: true });
      } else {
        setApiError(data?.message || "Unable to create your account.");
      }
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to create your account."));
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be 50 characters or fewer"),
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema,
    onSubmit: registerSubmit,
  });

  const fields = [
    ["name", "Your full name", "text", "name"],
    ["email", "Your email", "email", "email"],
    ["password", "Your password", "password", "new-password"],
    ["rePassword", "Confirm your password", "password", "new-password"],
    ["phone", "Your phone number", "tel", "tel"],
  ];

  return (
    <>
      <Helmet><title>Register | FreshCart</title></Helmet>
      <div className="row mt-5 py-4"><div className="col-md-12"><h1 className="h2 text-center">Register</h1></div></div>
      <div className="row mt-2 border rounded w-50 p-4 mx-auto">
        <div className="col-md-6"><div className="register-content">
          <h2 className="h5 mb-3">Create your account</h2>
          <form onSubmit={formik.handleSubmit} noValidate>
            {apiError && <div className="alert alert-danger border-0 text-center" role="alert">{apiError}</div>}
            {fields.map(([name, placeholder, type, autoComplete]) => (
              <React.Fragment key={name}>
                {formik.errors[name] && formik.touched[name] && <div className="alert alert-danger border-0 text-center py-2">{formik.errors[name]}</div>}
                <label className="visually-hidden" htmlFor={name}>{placeholder}</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type={type} id={name} name={name} autoComplete={autoComplete} className="w-100 mt-2 mb-1 form-control" placeholder={placeholder} />
              </React.Fragment>
            ))}
            <div className="button text-center">
              <button disabled={loading || !(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-light mt-1 w-75">
                {loading ? <Hourglass visible height="25" width="25" ariaLabel="Creating account" colors={["#FFF", "#0AAD0A"]} /> : "Register"}
              </button>
              <Link className="btn btn-outline-info mt-2 w-75" to="/login">Login now</Link>
            </div>
          </form>
        </div></div>
        <div className="col-md-6"><img src={cartPic} className="w-100 mx-auto py-3" alt="Shopping cart" /></div>
      </div>
    </>
  );
}