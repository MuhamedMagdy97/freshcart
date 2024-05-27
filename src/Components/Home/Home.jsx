import React from "react";
import style from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts />
    </>
  );
}
