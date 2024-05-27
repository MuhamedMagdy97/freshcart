import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import cartPic from "../../Assets/images/register.jpg";
import * as Yup from "yup";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const [loading, setloading] = useState(false);
  const [apiError, setapiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);
  async function loginSubmit(values) {
    setloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setapiError(err.response.data.message);
        setloading(false);
      });
    if (data.message == "success") {
      setloading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("email is Required").email("invalid email"),
    password: Yup.string()
      .required("password is Required")
      .matches(/^[A-z][\w @]{5,8}$/, "invalid password Ex(Ahmed123)"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  // ###############################################################################################################################

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="row mt-5 py-4">
        <div className="col-md-12">
          <div className="header-content">
            <h2 className="text-center ">login</h2>
          </div>
        </div>
      </div>
      <div className="row mt-2 border rounded w-50 p-4 mx-auto">
        <div className="col-md-6 ">
          <div className="login-content  ">
            <h3 className="h5 mb-3">Fill Your information</h3>
            <form onSubmit={formik.handleSubmit}>
              {apiError ? (
                <div className="alert alert-danger"> {apiError}</div>
              ) : (
                ""
              )}
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-100 mt-3 form-control"
                placeholder="Your Email"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger my-2 py-0">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                autoComplete="off"
                id="password"
                name="password"
                className="w-100 mt-3 form-control"
                placeholder="Your Password"
              />
              {loading ? (
                <button
                  type="button"
                  className="btn bg-main text-light ms-4 mt-3 w-75   "
                >
                  <Hourglass
                    visible={true}
                    height="15"
                    width="15"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#FFF", "#721ed"]}
                  />
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-light ms-4 mt-3 w-75  "
                >
                  Login Now
                </button>
              )}
              <button className="btn btn-outline-info ms-4 mt-2  w-75 ">
                <Link to={"/register"}>Register Now</Link>
              </button>
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
