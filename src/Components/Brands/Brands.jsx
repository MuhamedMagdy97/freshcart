import React from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function Brands() {
  const { data, isLoading, isError, error } = useQuery(
    ["brands"],
    async () => (await apiClient.get("/brands")).data.data
  );

  if (isLoading) return <div className="row justify-content-center align-items-center vh-100"><ColorRing visible height="100" width="100" ariaLabel="Loading brands" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /></div>;
  if (isError) return <div className="alert alert-danger mt-5" role="alert">{getApiErrorMessage(error, "Unable to load brands.")}</div>;

  return <>
    <Helmet><title>Brands | FreshCart</title></Helmet>
    <div className="row gy-4">{data.map((brand) => <div className="col-md-3 mt-5" key={brand.id}><div className="product"><img src={brand.image} className="w-100" alt={brand.name} loading="lazy" /><h1 className="h4 text-center text-main">{brand.name}</h1></div></div>)}</div>
  </>;
}