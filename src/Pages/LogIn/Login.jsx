import { useState } from "react";
import axios from "../../axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css"; // Ensure you have this CSS module
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

function Login() {
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate("/"); // Adjust the route as needed
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage(""); // Clear previous error messages

      const { data } = await axios.post("/users/login", { email, password });

      localStorage.setItem("token", data.token);

      // Show success toast notification
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to the desired page after login
      navigate("/");

    } catch (error) {
      console.error("Login failed: ", error.response || error.message);
      setErrorMessage(
        error?.response?.data?.msg || "An unexpected error occurred"
      );

      // Show error toast notification
      toast.error("Login failed!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } finally {
      setProcessing(false);
    }
  }

  const handleIconToggle = () => {
    setIcon((prev) => (prev === eyeOff ? eye : eyeOff));
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  // Navigate to Forgot Password page
  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <section className={classes.loginContainer}>
      <div className={classes.loginContent}>
        <div className={classes.loginForm}>
          <h4>
            Login to your account. Don’t have an account? <br />
            <Link to={"/register"} className={classes.link}>
              Create a new account
            </Link>
          </h4>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="email address"
                required
                aria-label="Email Address"
                className={classes.inputField}
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="password">Password:</label>
              <div className={classes.passwordContainer}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={type}
                  id="password"
                  placeholder="password"
                  required
                  aria-label="Password"
                  className={classes.inputField}
                />
                <span
                  className={classes.iconContainer}
                  onClick={handleIconToggle}
                  aria-label="Toggle Password Visibility"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleIconToggle();
                  }}
                >
                  <Icon className="field-icon" icon={icon} size={20} />
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className={classes.errorMessage}>{errorMessage}</div>
            )}
            <button
              type="submit"
              className={classes.loginButton}
              disabled={processing}
            >
              {processing ? (
                <div className={classes.loading}>
                  <ClipLoader color="orange" size={15} />
                  <span>Please wait...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p
            className={classes.forgotPassword}
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </p>
        </div>

        <div className={classes.textContent}>
          <h2>About</h2>
          <h1>Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button onClick={handleJoinNowClick} className={classes.howItWorks}>
            HOW IT WORKS
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
}

export default Login;
