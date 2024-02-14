import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpForm from './SignupForm';

// Mock signup function
const mockSignup = jest.fn();

test('renders without errors', () => {
  render(
    <MemoryRouter>
      <SignUpForm signup={mockSignup} />
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <SignUpForm signup={mockSignup} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
