import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import ProductList from './components/ProductList';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ProfileForm from './forms/ProfileForm';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import SuccessPage from './Success';

const Routes = ({ login, signup }) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route exact path="/products/:productId">
          <ProductPage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} exact path="/login" />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup}/>
        </Route> 
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/success">
          <SuccessPage />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
