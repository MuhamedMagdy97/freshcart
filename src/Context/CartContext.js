import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };



  //http://localhost:3000 change to the domain name
  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          //config header
          headers,
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          //config header
          headers,
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        //config header
        headers,
      })
      .then((responce) => responce)
      .catch((err) => err);
  }

  function deleteCartItems(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        //config header
        headers,
      })
      .then((responce) => responce)
      .catch((err) => err);
  }

  function updateCartItems(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${productId}`,
        {
          count,
        },
        {
          //config header
          headers,
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        deleteCartItems,
        updateCartItems,
        checkOutSession,
        
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
