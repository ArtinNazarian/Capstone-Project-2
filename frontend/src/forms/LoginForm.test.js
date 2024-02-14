import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm';

// Mock the login function prop
const mockLogin = jest.fn();

describe('LoginForm', () => {
  test('renders without errors', () => {
    render(
      <Router>
        <LoginForm login={mockLogin} />
      </Router>
    );
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <LoginForm login={mockLogin} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
