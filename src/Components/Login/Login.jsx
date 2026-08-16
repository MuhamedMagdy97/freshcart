import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import cartPic from "../../Assets/images/register.jpg";
import * as Yup from "yup";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  async function loginSubmit(values) {
    setLoading(true);
    setApiError(null);

    try {
      const { data } = await apiClient.post("/auth/signin", values);

      if (data?.message === "success" && data.token) {
        login(data.token);
        navigate("/", { replace: true });
      } else {
        setApiError(data?.message || "Unable to sign in. Please try again.");
      }
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Unable to sign in. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <Helmet><title>Login | FreshCart</title></Helmet>
      <div className="row mt-5 py-4"><div className="col-md-12"><h1 className="h2 text-center">Login</h1></div></div>
      <div className="row mt-2 border rounded w-50 p-4 mx-auto">
        <div className="col-md-6"><div className="login-content">
          <h2 className="h5 mb-3">Sign in to your account</h2>
          <form onSubmit={formik.handleSubmit} noValidate>
            {apiError && <div className="alert alert-danger" role="alert">{apiError}</div>}
            {formik.errors.email && formik.touched.email && <div className="alert alert-danger my-2 py-0">{formik.errors.email}</div>}
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" autoComplete="email" className="w-100 mt-3 form-control" placeholder="Your email" />
            {formik.errors.password && formik.touched.password && <div className="alert alert-danger my-2 py-0">{formik.errors.password}</div>}
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" autoComplete="current-password" className="w-100 mt-3 form-control" placeholder="Your password" />
            <button disabled={loading || !(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-light ms-4 mt-3 w-75">
              {loading ? <Hourglass visible height="15" width="15" ariaLabel="Signing in" colors={["#FFF", "#721ed"]} /> : "Login now"}
            </button>
            <Link className="btn btn-outline-info ms-4 mt-2 w-75" to="/register">Register now</Link>
          </form>
        </div></div>
        <div className="col-md-6"><img src={cartPic} className="w-100 mx-auto py-3" alt="Shopping cart" /></div>
      </div>
    </>
  );
}