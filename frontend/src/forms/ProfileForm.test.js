import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import UserContext from "../UserContext";
import CoffeeApi from "../api";
import ProfileForm from "./ProfileForm";

// Mock the CoffeeApi.getTransactions function
jest.mock("../api");
CoffeeApi.getTransactions = jest.fn();

// Mock the deleteUser function prop
const mockDeleteUser = jest.fn();

// Mock the UserContext
const mockCurrentUser = {
  username: "testUser",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
};

const mockContext = {
  currentUser: mockCurrentUser,
  setCurrentUser: jest.fn(),
};

describe("ProfileForm", () => {
  test("renders without errors", async () => {
    CoffeeApi.getTransactions.mockResolvedValueOnce([]);

    await act(async () => {
      render(
        <Router>
          <UserContext.Provider value={mockContext}>
            <ProfileForm deleteUser={mockDeleteUser} />
          </UserContext.Provider>
        </Router>
      );
    });
  });

  test("matches snapshot", async () => {
    CoffeeApi.getTransactions.mockResolvedValueOnce([]);

    let asFragment;
    await act(async () => {
      const { asFragment: result } = render(
        <Router>
          <UserContext.Provider value={mockContext}>
            <ProfileForm deleteUser={mockDeleteUser} />
          </UserContext.Provider>
        </Router>
      );
      asFragment = result;
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
