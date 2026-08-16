import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const { userToken, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img src={logo} alt="Freshcart" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken && <>
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/brands">Brands</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
            </>}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center" aria-label="Freshcart social channels"><i className="fab fa-facebook me-2" aria-hidden="true" /><i className="fab fa-instagram me-2" aria-hidden="true" /><i className="fab fa-twitter me-2" aria-hidden="true" /><i className="fab fa-youtube me-2" aria-hidden="true" /></li>
            {userToken ? <li className="nav-item"><button type="button" onClick={handleLogout} className="btn nav-link">Logout</button></li> : <><li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li><li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li></>}
          </ul>
        </div>
      </div>
    </nav>
  );
}