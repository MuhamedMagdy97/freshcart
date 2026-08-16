import { createContext } from "react";
import { apiClient, getAppUrl } from "../api/client";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  function checkOutSession(cartId, shippingAddress) {
    return apiClient.post(
      `/orders/checkout-session/${encodeURIComponent(cartId)}`,
      { shippingAddress },
      { params: { url: getAppUrl("/orders") } }
    );
  }

  function addToCart(productId) {
    return apiClient.post("/cart", { productId });
  }

  function getCartItems() {
    return apiClient.get("/cart");
  }

  function deleteCartItems(productId) {
    return apiClient.delete(`/cart/${encodeURIComponent(productId)}`);
  }

  function updateCartItems(productId, count) {
    return apiClient.put(`/cart/${encodeURIComponent(productId)}`, { count });
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
      {children}
    </CartContext.Provider>
  );
}