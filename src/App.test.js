import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";

function renderApp() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider><App /></CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

test("renders the login page for an unauthenticated visitor", async () => {
  window.localStorage.clear();
  window.history.pushState({}, "", "/login");
  renderApp();

  expect(await screen.findByRole("heading", { name: /login/i })).toBeInTheDocument();
});