import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import UserContextProvider from "./Context/UserContext.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "./Context/CartContext.js";

let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </UserContextProvider>
  </CartContextProvider>
);

// this will prevent the 404 page in gh
<script type="text/javascript">
  var pathSegmentsToKeep = 1; var l = window.location; l.replace( l.protocol +
  "//" + l.hostname + (l.port ? ":" + l.port : "") + l.pathname .split("/")
  .slice(0, 1 + pathSegmentsToKeep) .join("/") + "/?/" + l.pathname .slice(1)
  .split("/") .slice(pathSegmentsToKeep) .join("/") .replace(/&/g, "~and~") +
  (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") + l.hash );
</script>;

reportWebVitals();
