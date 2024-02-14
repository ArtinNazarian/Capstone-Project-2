import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Routes from './Routes';


jest.mock('./Homepage', () => () => <div>Homepage</div>);
jest.mock('./components/ProductList', () => () => <div>ProductList</div>);
jest.mock('./forms/LoginForm', () => () => <div>LoginForm</div>);
jest.mock('./forms/SignupForm', () => () => <div>SignupForm</div>);
jest.mock('./forms/ProfileForm', () => () => <div>ProfileForm</div>);
jest.mock('./ProductPage', () => () => <div>ProductPage</div>);
jest.mock('./CartPage', () => () => <div>CartPage</div>);
jest.mock('./Success', () => () => <div>SuccessPage</div>);

describe('Routes component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
