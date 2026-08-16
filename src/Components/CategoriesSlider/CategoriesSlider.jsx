import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function CategoriesSlider() {
  const { data, isLoading, isError, error } = useQuery(
    ["categories"],
    async () => (await apiClient.get("/categories")).data.data
  );
  const settings = {
    dots: false,
    infinite: data?.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  if (isLoading) return <div className="text-center py-3" role="status">Loading categories…</div>;
  if (isError) return <div className="alert alert-warning" role="alert">{getApiErrorMessage(error, "Unable to load categories.")}</div>;

  return <div className="row"><Slider {...settings}>{data.map((category) => <div key={category.id} className="px-1"><img src={category.image} height="200" className="w-100 img" alt={category.name} loading="lazy" /><p>{category.name}</p></div>)}</Slider></div>;
}