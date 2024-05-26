import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          //config header
          headers
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }
  function getCartItems() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          //config header
          headers
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }

  function deleteCartItems(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          //config header
          headers
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }


  function updateCartItems(productId , count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count 
        },
        {
          //config header
          headers
        }
      )
      .then((responce) => responce)
      .catch((err) => err);
  }



  return (
    <CartContext.Provider value={{ addToCart, getCartItems, deleteCartItems , updateCartItems}}>
      {props.children}
    </CartContext.Provider>
  );
}
