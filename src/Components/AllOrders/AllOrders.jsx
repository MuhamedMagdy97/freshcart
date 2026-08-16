import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../Context/UserContext";
import { apiClient, getApiErrorMessage } from "../../api/client";

export default function AllOrders() {
  const { userId } = useContext(UserContext);
  const { data, isLoading, isError, error } = useQuery(
    ["orders", userId],
    async () => (await apiClient.get(`/orders/user/${encodeURIComponent(userId)}`)).data,
    { enabled: Boolean(userId) }
  );

  if (!userId) return <div className="alert alert-danger mt-5" role="alert">We could not identify your account. Please sign in again.</div>;
  if (isLoading) return <div className="loading" role="status">Loading orders…</div>;
  if (isError) return <div className="alert alert-danger mt-5" role="alert">{getApiErrorMessage(error, "Unable to load your orders.")}</div>;

  const orders = Array.isArray(data) ? data : data?.data || [];
  return <>
    <div className="bg-main-light p-5 my-5"><h1 className="h2 text-center">Your orders</h1></div>
    {orders.length === 0 ? <p className="text-center">You have not placed an order yet.</p> : <div className="row gy-3">{orders.map((order) => <div className="col-12" key={order._id}><article className="border rounded p-3"><div className="d-flex justify-content-between"><h2 className="h5 mb-0">Order #{order.id || order._id}</h2><span>{new Date(order.createdAt).toLocaleDateString()}</span></div><p className="mb-1">Items: {order.cartItems?.length || 0}</p><p className="mb-1">Total: {order.totalOrderPrice} EGP</p><p className="mb-0">Payment: {order.paymentMethodType}</p></article></div>)}</div>}
    <div className="mx-auto text-center"><Link to="/" className="btn bg-main text-light text-center mb-5">Go back to shopping</Link></div>
  </>;
}