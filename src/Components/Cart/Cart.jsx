import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import style from "./Cart.module.css";

export default function Cart() {

  
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  let { getCartItems, deleteCartItems, updateCartItems } =
    useContext(CartContext);

  async function easyCart(apiCall, { setLoadingState = true } = {}, ...args) {
    if (setLoadingState) setLoading(true);
    let { data } = await apiCall(...args);
    console.log(data);
    setCart(data);
    if (setLoadingState) setLoading(false);
  }

  async function getItems() {
    await easyCart(getCartItems);
  }

  async function deleteItems(id) {
    await easyCart(deleteCartItems, {}, id);
  }

  async function updateItems(id, count) {
    setLoading(false);
    await easyCart(() => updateCartItems(id, count), {
      setLoadingState: false,
    });
    if (count < 1) {
      await deleteItems(id);
    }
  }

  /* Repetitive Code */
  // async function getItems() {
  //   let { data } = await getCartItems();
  //   console.log(data);
  //   setCart(data);
  //   setLoading(false);
  // }

  // async function deleteItems(id) {
  //   setLoading(true);
  //   let { data } = await deleteCartItems(id);
  //   console.log(data);
  //   setCart(data);
  //   setLoading(false);
  // }

  // async function updateItems(id , count) {
  //   // setLoading(true);
  //   let { data } = await updateCartItems(id , count);
  //   console.log(data);
  //   setCart(data);
  //   setLoading(false);
  // }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <section>
        <div className="bg-main-light p-2 mt-5">
          {loading ? (
            <div className="loading">
              <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : cart ? (
            <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
              </Helmet>
              {cart.numOfCartItems === 0 ? (
                <p className="text-center fw-bolder">Your Cart is empty</p>
              ) : (
                <>
                  {" "}
                  <p className="text-main">
                    Cart Products Count : {cart.numOfCartItems}
                  </p>
                  <p className="text-main">
                    Total Cart Price : {cart.data.totalCartPrice} EGP
                  </p>{" "}
                </>
              )}

              {cart.data.products.map((product) => (
                <div
                  key={product.product.id}
                  className="row border-1 border-bottom p-2 m-0 align-items-center "
                >
                  <div className="col-md-1">
                    <div className="img">
                      <img
                        src={product.product.imageCover}
                        className="w-100 py-1"
                        alt={product.product.title}
                      />
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="item">
                      <h3 className="h6 fw-bold">
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <p className="text-main fw-bold">
                        {" "}
                        Price : {product.price} EGP
                      </p>
                      <button
                        onClick={() => deleteItems(product.product.id)}
                        className="btn"
                      >
                        <i className="fas fa-trash-can text-danger pe-2"></i>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-md-1">
                    <div className="count">
                      <button
                        onClick={() =>
                          updateItems(product.product.id, product.count + 1)
                        }
                        className="btn brdr p-1"
                      >
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateItems(product.product.id, product.count - 1)
                        }
                        className="btn brdr p-1"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {cart.numOfCartItems != 0 ? (
                  <>
                    <Link
                      to={`/ShippingAddress/${cart.data._id}`}
                      className="btn bg-main text-light m-3"
                    >
                      Check Out
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <h2 className="text-center p-5">Cart is Empty</h2>
          )}
        </div>
      </section>
    </>
  );
}
