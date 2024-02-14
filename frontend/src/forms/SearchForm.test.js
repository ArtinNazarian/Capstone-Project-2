import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

// Mock searchFor function
const mockSearchFor = jest.fn();

test('renders without errors', () => {
  render(<SearchForm searchFor={mockSearchFor} />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<SearchForm searchFor={mockSearchFor} />);
  expect(asFragment()).toMatchSnapshot();
});
