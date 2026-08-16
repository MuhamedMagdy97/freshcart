import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery(
    ["categories"],
    async () => (await apiClient.get("/categories")).data.data
  );

  if (isLoading) return <div className="row justify-content-center align-items-center vh-100"><ColorRing visible height="100" width="100" ariaLabel="Loading categories" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /></div>;
  if (isError) return <div className="alert alert-danger mt-5" role="alert">{getApiErrorMessage(error, "Unable to load categories.")}</div>;

  return <>
    <Helmet><title>Categories | FreshCart</title></Helmet>
    <div className="row gy-4 mt-5">{data.map((category) => <div key={category.id} className="col-md-4"><article className="cat-container"><img src={category.image} className="w-100 img" height="400" alt={category.name} loading="lazy" /><h1 className="h2 text-main text-center pt-4">{category.name}</h1></article></div>)}</div>
  </>;
}