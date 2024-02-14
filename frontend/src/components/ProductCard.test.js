import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { toast } from "react-hot-toast";
import ProductCard from './ProductCard';

jest.mock("use-shopping-cart", () => ({
  useShoppingCart: () => ({
    addItem: jest.fn()
  }),
  formatCurrencyString: jest.fn(({ value, currency }) => `${currency}${(value/100).toFixed(2)}`) // More accurate mock
}));

jest.mock("react-hot-toast");

const mockProduct = {
  id: 1,
  name: "Test Product",
  image: "test.jpg",
  price: 1000,
  currency: "$"
};

test('ProductCard matches snapshot', () => {
  const { asFragment } = render(
    <Router>
      <ProductCard product={mockProduct} index={0} />
    </Router>
  );
  
  expect(asFragment()).toMatchSnapshot();
});
