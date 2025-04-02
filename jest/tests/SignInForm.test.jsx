import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "../../frontend/src/SignInComponents/SignInForm";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("SignInForm", () => {
  it("renders inputs and button", () => {
    renderWithRouter(<SignInForm />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("displays error on failed login", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: { message: "Invalid credentials" },
      },
    });

    renderWithRouter(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    );
  });
});
