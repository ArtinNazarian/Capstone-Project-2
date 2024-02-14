import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartPage from './CartPage';

// Mock the useShoppingCart hook
jest.mock('use-shopping-cart', () => ({
  useShoppingCart: () => ({
    cartCount: 0,
    cartDetails: {},
    formattedTotalPrice: "$0.00",
    totalPrice: 0,
    clearCart: jest.fn(),
  }),
}));

// Mock the Modal setAppElement function
jest.mock('react-modal', () => {
  const originalModule = jest.requireActual('react-modal');
  originalModule.setAppElement = jest.fn(); // do nothing function
  return originalModule;
});

describe('CartPage', () => {
  test('renders without errors', () => {
    render(
      <Router>
        <CartPage />
      </Router>
    );
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <CartPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
