import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function FeaturedProducts() {
  const [addingProductId, setAddingProductId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { data, isLoading, isError, error } = useQuery(
    ["featured-products"],
    () => apiClient.get("/products")
  );

  async function postToCart(id) {
    setAddingProductId(id);
    try {
      const { data: response } = await addToCart(id);
      toast.success(response?.message || "Product added to cart.");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Unable to add this product to your cart."));
    } finally {
      setAddingProductId(null);
    }
  }

  if (isLoading) return <div className="row justify-content-center align-items-center vh-100"><ColorRing visible height="100" width="100" ariaLabel="Loading products" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /></div>;
  if (isError) return <div className="alert alert-danger mt-5" role="alert">{getApiErrorMessage(error, "Unable to load products.")}</div>;

  const products = data?.data?.data || [];
  return <>
    <h2 className="h1 fw-bolder mt-5">Featured products</h2>
    <div className="row gy-4">{products.map((product) => <div key={product.id} className="col-lg-3 col-md-4"><div className="product my-3 p-2"><Link to={`/products/${product.id}`}><img src={product.imageCover} className="w-100" alt={product.title} loading="lazy" /><span className="font-sm text-main">{product.category.name}</span><h3 className="h5">{product.title.split(" ").slice(0, 2).join(" ")}</h3><div className="d-flex py-3 justify-content-between align-items-center"><span className="font-sm">{product.price} EGP</span><span className="font-sm"><i className="fas fa-star rating-color me-1" aria-hidden="true" />{product.ratingsAverage}</span></div></Link><button type="button" disabled={addingProductId === product.id} onClick={() => postToCart(product.id)} className="btn bg-main text-main-light w-100 btn-sm">{addingProductId === product.id ? 'Adding…' : 'Add to cart'}</button></div></div>)}</div>
  </>;
}