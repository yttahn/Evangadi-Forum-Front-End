import { useState } from "react";
import axios from "../../axios/axiosConfig";
import classes from "../LogIn/Forgot.module.css";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage("");
      setSuccessMessage("");

      const { data } = await axios.post("/users/forgot-password", { email });

      if (data.success) {
        setSuccessMessage("Password reset link has been sent to your email.");
      } else {
        setErrorMessage("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "An unexpected error occurred"
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <section className={classes.forgotPasswordContainer}>
        <div className={classes.forgotPasswordContent}>
          <h2>Forgot Password</h2>
          <p>
            Please enter your email address to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {errorMessage && (
              <div className={classes.errorMessage}>{errorMessage}</div>
            )}

            {successMessage && (
              <div className={classes.successMessage}>{successMessage}</div>
            )}

            <button type="submit" disabled={processing}>
              {processing ? (
                <div className="loading">
                  <ClipLoader color="orange" size={15} />
                  <span>Please wait...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <button
            onClick={() => navigate("/login")}
            className={classes.backButton}
          >
            Back to Login
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default ForgotPassword;
