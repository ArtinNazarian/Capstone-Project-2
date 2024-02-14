import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Homepage';

it('renders without crashing', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
});

it('matches snapshot', () => {
  const { asFragment } = render(
    <Router>
      <Home />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
