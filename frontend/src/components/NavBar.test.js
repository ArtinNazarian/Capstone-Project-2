// NavBar.test.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import UserContext from "../UserContext";
import { useShoppingCart } from "use-shopping-cart";
import NavBar from "./NavBar";

jest.mock("use-shopping-cart", () => ({
  useShoppingCart: () => ({
    formattedTotalPrice: "£0.00",
    cartCount: 0,
  }),
}));

jest.mock("../UserContext");

test("NavBar matches snapshot", () => {
  const mockContext = {
    currentUser: { username: "Test" },
    logout: jest.fn(),
  };

  UserContext._currentValue = mockContext;

  const { asFragment } = render(
    <Router>
      <NavBar />
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});
