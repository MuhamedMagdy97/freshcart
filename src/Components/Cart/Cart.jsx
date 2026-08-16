import React, { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../api/client";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingProductId, setPendingProductId] = useState(null);
  const { getCartItems, deleteCartItems, updateCartItems } = useContext(CartContext);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getCartItems();
      setCart(data);
    } catch (requestError) {
      setCart(null);
      setError(getApiErrorMessage(requestError, "Unable to load your cart."));
    } finally {
      setLoading(false);
    }
  }, [getCartItems]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  async function mutateCart(productId, request, successMessage) {
    setPendingProductId(productId);
    setError(null);

    try {
      const { data } = await request();
      setCart(data);
      if (successMessage) toast.success(successMessage);
    } catch (requestError) {
      const message = getApiErrorMessage(requestError, "Unable to update your cart.");
      setError(message);
      toast.error(message);
    } finally {
      setPendingProductId(null);
    }
  }

  function handleRemove(productId) {
    return mutateCart(productId, () => deleteCartItems(productId), "Item removed from cart.");
  }

  function handleQuantityChange(productId, count) {
    if (count < 1) return handleRemove(productId);
    return mutateCart(productId, () => updateCartItems(productId, count));
  }

  const products = cart?.data?.products || [];
  const itemCount = cart?.numOfCartItems || 0;

  return (
    <section>
      <Helmet><title>Cart | FreshCart</title></Helmet>
      <div className="bg-main-light p-2 mt-5">
        {loading ? <div className="loading"><ColorRing visible height="100" width="100" ariaLabel="Loading cart" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} /></div> : <>
          {error && <div className="alert alert-danger m-3" role="alert">{error}<button type="button" className="btn btn-link" onClick={loadCart}>Try again</button></div>}
          {products.length === 0 ? <p className="text-center fw-bolder p-4">Your cart is empty.</p> : <>
            <p className="text-main">Cart products count: {itemCount}</p>
            <p className="text-main">Total cart price: {cart.data.totalCartPrice} EGP</p>
            {products.map(({ product, price, count }) => {
              const isPending = pendingProductId === product.id;
              return <div key={product.id} className="row border-1 border-bottom p-2 m-0 align-items-center">
                <div className="col-md-1"><img src={product.imageCover} className="w-100 py-1" alt={product.title} loading="lazy" /></div>
                <div className="col-md-10"><h2 className="h6 fw-bold">{product.title.split(" ").slice(0, 3).join(" ")}</h2><p className="text-main fw-bold">Price: {price} EGP</p><button type="button" onClick={() => handleRemove(product.id)} disabled={isPending} className="btn"><i className="fas fa-trash-can text-danger pe-2" aria-hidden="true" />Remove</button></div>
                <div className="col-md-1"><div className="count"><button type="button" onClick={() => handleQuantityChange(product.id, count + 1)} disabled={isPending} className="btn brdr p-1" aria-label={`Increase ${product.title} quantity`}>+</button><span className="mx-2">{count}</span><button type="button" onClick={() => handleQuantityChange(product.id, count - 1)} disabled={isPending} className="btn brdr p-1" aria-label={`Decrease ${product.title} quantity`}>-</button></div></div>
              </div>;
            })}
            <Link to={`/shipping-address/${cart.data._id}`} className="btn bg-main text-light m-3">Checkout</Link>
          </>}
        </>}
      </div>
    </section>
  );
}