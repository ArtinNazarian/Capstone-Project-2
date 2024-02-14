import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

/** User login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *u
 * Routes -> LoginForm
 * Routed as /login
 */

const LoginForm = ({ login }) => {
  const history = useHistory();

  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Update form fields */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await login(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        // imperatively redirect to correct page and refresh to see new data
        history.goBack();
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-5 mx-auto w-full md:w-5/12 lg:w-4/12">
      <Card className="rounded overflow-hidden shadow-md">
        <CardBody className="px-8 pt-6 pb-8 mb-4">
          <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
            Log In
          </h1>
          <form onSubmit={handleSubmit} className="mb-4">
            {["username", "password"].map((field) => (
              <div key={field} className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            {formErrors && (
              <p className="text-red-500 text-xs italic">{formErrors}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
