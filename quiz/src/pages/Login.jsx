import { useState } from "react";
import { account } from "../appwrite/appwrite";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { FcGoogle } from "react-icons/fc";
/**
 * Renders a login form for users to authenticate and log in to the web application.
 * @returns {JSX.Element} The rendered login form.
 */
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "", errorMsg: "" });

  /**
   * Handles the login form submission.
   * Authenticates the user with the provided email and password.
   * Navigates to the profile page if successful.
   * Sets the error message if there is an error during login.
   * @param {Event} e - The form submission event.
   */
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(user.email, user.password);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.log(err);
      setUser((prevUser) => ({
        ...prevUser,
        errorMsg: "Please check your email and password",
      }));
    }
  };

  /**
   * Handles the Google sign-in button click event.
   * Initiates the OAuth2 authentication flow with Google.
   * @param {Event} e - The button click event.
   */
  function googleSignin(e) {
    e.preventDefault();

    // Go to OAuth provider login page
    account.createOAuth2Session(
      "google",
      "http://localhost:5173/profile",
      "http://localhost:5173/login"
    );
  }

  return (
    <section className="bg-bgColor min-h-screen ">
      <Header />
      <div className="grid grid-cols-2  justify-center py-12  px-32 items-center">
        <div className="w-[60rem]">
          <img src="Tablet login-amico.svg" alt="Tablet login" />
        </div>

        <div className="w-full bg-white  p-16 shadow  ">
          <h2 className="text-center text-[3.5rem] font-bold">Welcome Back!</h2>
          <h3 className="text-center text-[1.5rem] italic pb-16 text-secondary">
            Log in to QuizWiz and Continue Your Learning Journey!
          </h3>

          <div className=" ">
            <form className="space-y-6" action="#" method="POST">
              <InputField
                label="Email Address"
                id="email"
                placeholder="example@example.com"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
                type="email"
              />

              <InputField
                label="Password"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
                placeholder="**********"
              />

              <p className={`text-[1.4rem] italic text-red-600 `}>
                {user.errorMsg}
              </p>

              <div>
                <button
                  type="submit"
                  className="mt-12 py-4 px-8 border border-transparent rounded-lg shadow-sm text-[1.5rem] font-semibold text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={loginUser}
                >
                  Log in
                </button>
              </div>

              <div className="text-center mt-4">
                <p className=" text-[1.5rem] font-medium">
                  New to QuizWiz ?{" "}
                  <Link to="/sign up" className="text-secondary font-semibold">
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-4 my-4">
                <hr className="border-t border-gray-300 w-1/2" />
                <p className="uppercase text-center text-[2.5rem] text-gray-400">
                  OR
                </p>
                <hr className="border-t border-gray-300 w-1/2" />
              </div>
              <div
                className="flex justify-center items-center gap-4 bg-bgColor p-8 shadow-md cursor-pointer"
                onClick={googleSignin}
              >
                <FcGoogle className="w-[2rem] h-[2rem]" />
                <span className="text-[1.5rem] text-secondary font-semibold">
                  Sign in with Google
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
