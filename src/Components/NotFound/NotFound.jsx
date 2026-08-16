import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../Assets/images/error.svg";

export default function NotFound() {
  return <section className="text-center py-5"><img src={errorImage} alt="Page not found" className="img-fluid" style={{ maxWidth: "20rem" }} /><h1 className="h2 mt-3">Page not found</h1><p>The page you requested does not exist or has moved.</p><Link to="/" className="btn bg-main text-light">Back to home</Link></section>;
}