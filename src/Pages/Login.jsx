import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page"> {/* Added class for layout */}
      <div className="login-container">
        <h3>Login to your account</h3>
        <div className="account-question">
          <p>Don’t have an account?</p>
          <a href=""><p>Create a new account</p></a>
        </div>

        <form>
          <input type="email" placeholder="Email" required />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePassword}
            >
              <span className={`eye-icon ${showPassword ? 'active' : ''}`}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </button>
          </div>
          <a href=""><p className='forgot'>Forgot password?</p></a>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <div className="about-section">
        <h4>About</h4>
        <h1>Evangadi Networks Q & A</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
          <br />
          <br />
          Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
        </p>
        <Link to="/how-it-works">
          <button className="how-it-works-button">HOW IT WORKS</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
