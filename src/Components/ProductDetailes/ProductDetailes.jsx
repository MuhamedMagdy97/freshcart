import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [addingToCart, setAddingToCart] = useState(false);
  const { data: details, isLoading, isError, error } = useQuery(
    ["product", id],
    async () => (await apiClient.get(`/products/${encodeURIComponent(id)}`)).data.data,
    { enabled: Boolean(id) }
  );

  async function handleAddToCart() {
    setAddingToCart(true);
    try {
      const { data } = await addToCart(id);
      toast.success(data?.message || "Product added to cart.");
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, "Unable to add this product to your cart."));
    } finally {
      setAddingToCart(false);
    }
  }

  const settings = { dots: false, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false, autoplay: true, autoplaySpeed: 2000 };
  if (isLoading) return <div className="row justify-content-center align-items-center vh-100"><ColorRing visible height="100" width="100" ariaLabel="Loading product" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /></div>;
  if (isError || !details) return <div className="alert alert-danger mt-5" role="alert">{getApiErrorMessage(error, "Unable to load this product.")}</div>;

  return <>
    <Helmet><title>{details.title} | FreshCart</title><link rel="canonical" href={`${window.location.origin}${process.env.PUBLIC_URL || ""}/products/${id}`} /></Helmet>
    <div className="row align-items-center mt-5">
      <div className="col-md-4"><Slider {...settings}>{details.images.map((image) => <img key={image} className="w-100" src={image} alt={details.title} />)}</Slider></div>
      <div className="col-md-7"><div className="details"><h1 className="h5">{details.title}</h1><p className="py-3">{details.description}</p><span className="font-sm text-main">{details.category.name}</span><div className="d-flex py-3 justify-content-between align-items-center"><span className="font-sm">{details.price} EGP</span><span className="font-sm"><i className="fas fa-star rating-color me-1" aria-hidden="true" />{details.ratingsAverage}</span></div><button type="button" disabled={addingToCart} onClick={handleAddToCart} className="btn bg-main text-main-light w-100 btn-sm">{addingToCart ? 'Adding…' : 'Add to cart'}</button></div></div>
    </div>
  </>;
}