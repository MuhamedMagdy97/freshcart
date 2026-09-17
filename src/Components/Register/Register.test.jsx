jest.mock("../../api/client", () => ({
  apiClient: { post: jest.fn() },
  getApiErrorMessage: jest.fn(),
}));

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { apiClient } from "../../api/client";

test("submits valid registration details", async () => {
  apiClient.post.mockResolvedValue({ data: { message: "success" } });

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const values = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    rePassword: "password123",
    phone: "01012345678",
  };

  await act(async () => {
    Object.entries(values).forEach(([field, value]) => {
      fireEvent.change(document.getElementById(field), {
        target: { name: field, value },
      });
    });
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
  });

  await waitFor(() => {
    expect(apiClient.post).toHaveBeenCalledWith("/auth/signup", values);
  });
});
