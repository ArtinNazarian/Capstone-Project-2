import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import { decodeToken } from "react-jwt";
import CoffeeApi from "./api";
import "./App.css";
import NavBar from "./components/NavBar";
import Routes from "./Routes";
import UserContext from "./UserContext";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "mode-token";

/** eCommerce application.
 *
 * - currentUser: user obj from API. This becomes the way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const stripePromise = loadStripe(
    "pk_test_51OckYMDs84GRSvYx8VmyfTj8yWI0yOfUdhtOhQiLyvWQuzJSSQpwOqLfzMcuGTZFyLtpCG6tdLnB05nPZn6JtnK400xcNgzBWg"
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let decoded = decodeToken(token);
          if (decoded && decoded.username) {
            let { username } = decoded;
            // put the token on the Api class so it can use it to call the API.
            CoffeeApi.token = token;
            let currentUser = await CoffeeApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } else {
            setCurrentUser(null);
          }
        } catch (err) {
          console.error("App getCurrentUser: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   * */
  async function signup(signupData) {
    try {
      let token = await CoffeeApi.signup(signupData);
      setToken(token);
      CoffeeApi.token = token;
      let decoded = decodeToken(token);
      setCurrentUser(decoded);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await CoffeeApi.login(loginData);
      setToken(token);
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Deletes a user and all their data */
  async function deleteUser() {
    try {
      await CoffeeApi.deleteProfile(currentUser.username);
      logout();
      return { success: true };
    } catch (errors) {
      console.error("delete failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout. */
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            <NavBar />
            <main className="flex-grow bg-[#f7f7f7]">
              <Routes login={login} signup={signup} deleteUser={deleteUser} />
            </main>
          </UserContext.Provider>
          <Toaster />
        </Elements>
      </BrowserRouter>
    </div>
  );
}

export default App;
