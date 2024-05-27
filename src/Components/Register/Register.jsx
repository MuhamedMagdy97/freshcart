import style from "./Register.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import cartPic from "../../Assets/images/register.jpg";
import * as Yup from "yup";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  let navigate = useNavigate();

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      values)
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
        navigate('/login');
      });

    if (data.message == "success") {
      setLoading(false);

    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),

    email: Yup.string().required("Email is Required").email("invalid email"),

    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][\w @]{5,8}$/, "invalid Password"),

    rePassword: Yup.string()
      .required("RePassword is required")
      .oneOf([Yup.ref("password")], "Password and rePassword not the same"),

    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyption number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="row mt-5 py-4">
        <div className="col-md-12">
          <div className="header-content">
            <h2 className="text-center ">Register</h2>
          </div>
        </div>
      </div>
      <div className="row mt-2 border rounded w-50 p-4 mx-auto">
        <div className="col-md-6 ">
          <div className="register-content  ">
            <h3 className="h5 mb-3">Fill Your information</h3>
            <form onSubmit={formik.handleSubmit}>
              {apiError ? (
                <div className="alert alert-danger border-0 text-center">
                  {apiError}
                </div>
              ) : null}
              {/* name */}
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger border-0 text-center  py-2">
                  {formik.errors.name}
                </div>
              ) : null}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="name"
                name="name"
                className="w-100 mt-2 mb-1 form-control"
                placeholder="Your Full Name"
              />

              {/* email */}
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger border-0 text-center  py-2">
                  {formik.errors.email}
                </div>
              ) : null}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-100 mt-2  mb-1 form-control"
                placeholder="Enter Your Email"
                autoComplete="new-email"
              />

              {/* password */}

              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger border-0 text-center  py-2">
                  {formik.errors.password}
                </div>
              ) : null}

              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="password"
                name="password"
                className="w-100 mt-2  mb-1 form-control"
                placeholder="Your Password"
                autoComplete="new-password"
              />
              {/* rePassword */}

              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger border-0 text-center  py-2">
                  {formik.errors.rePassword}
                </div>
              ) : null}

              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="rePassword"
                name="rePassword"
                className="w-100 mt-2 mb-1 form-control"
                placeholder="Your rePassword"
                autoComplete="renew-password"
              />
              {/* phone */}

              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger border-0 text-center  py-2">
                  {formik.errors.phone}
                </div>
              ) : null}

              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                id="phone"
                name="phone"
                className="w-100 mt-2 mb-1 form-control"
                placeholder="Your Phone"
              />
              <div className="button text-center">
                {loading ? (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="button"
                    className="btn bg-main text-light mt-1 w-75"
                  >
                    <Hourglass
                      visible={true}
                      height="25"
                      width="25"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#FFF", "#0AAD0A"]}
                    />
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn bg-main text-light mt-1 w-75"
                  >
                    Register
                  </button>
                )}
                <button className="btn btn-outline-info mt-2  w-75 ">
                  <Link to={"/login"}>Login Now</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="right-img">
            <img
              src={cartPic}
              className="w-100 mx-auto py-3"
              alt="shopping cart"
            />
          </div>
        </div>
      </div>
    </>
  );
}
