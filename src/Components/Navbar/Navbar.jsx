import React, { useContext } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from "../../Context/UserContext";
export default function Navbar() {

  let {userToken ,setUserToken} = useContext(UserContext)
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="Freshcart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken != null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Brands"}>
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Cart"}>
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Products"}>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Categories"}>
                      Categories
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook me-2"></i>
                <i className="fab fa-instagram me-2"></i>
                <i className="fab fa-twitter me-2"></i>
                <i className="fab fa-youtube me-2"></i>
              </li>

              {userToken != null ? (
                <>
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link cursor-pointer">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"Register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
