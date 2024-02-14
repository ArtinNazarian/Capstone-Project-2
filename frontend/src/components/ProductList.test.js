// ProductList.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from './ProductList';

test('ProductList renders without crashing', () => {
  render(
    <Router>
      <ProductList />
    </Router>
  );
});

test('ProductList matches snapshot', () => {
  const { asFragment } = render(
    <Router>
      <ProductList />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
