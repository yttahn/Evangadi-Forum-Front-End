import React, { useContext, useEffect, useState } from "react";
import "./Header.css"; // Using the CSS format from Page 1
import logo from "../../image/evangadi-logo.png";
import { AppState } from "../../App";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);
  const [isScrolled, setIsScrolled] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isUserLoggedIn = !!token;

  // Add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : "main"}`}>
      <div className="logo">
        {isUserLoggedIn ? (
          <Link to="/">
            <img src={logo} alt="Evangadi Logo" />
          </Link>
        ) : (
          <img src={logo} alt="Your Logo" />
        )}
      </div>

      {isUserLoggedIn ? (
        <>
          <div className="nav-links">
            <Link to={isUserLoggedIn ? "/questions" : "/"}>Home</Link>
            <Link to="/howitworks">How It Works</Link>
          </div>
          <button className="sign-in" onClick={handleLogout}>
            SIGN OUT
          </button>
        </>
      ) : (
        <Link to="/login">
          <button className="sign-in">SIGN IN</button>
        </Link>
      )}
    </nav>
  );
}

export default Header;
