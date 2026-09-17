import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";

export default function Products() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <FeaturedProducts></FeaturedProducts>
    </>
  );
}
