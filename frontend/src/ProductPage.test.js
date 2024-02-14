import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductPage from './ProductPage';

// Mock the useShoppingCart hook
jest.mock('use-shopping-cart', () => ({
  useShoppingCart: () => ({
    addItem: jest.fn(),
  }),
}));

describe('ProductPage', () => {
  test('renders without errors', () => {
    render(
      <Router>
        <ProductPage />
      </Router>
    );
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <ProductPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
