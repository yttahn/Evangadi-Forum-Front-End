import React, { useContext, useEffect, useState } from "react";
import classes from "../Header/header.module.css";
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
    <header className={isScrolled ? classes.scrolled : ""}>
      <div className={classes.header_container}>
        <div className="logo">
          {isUserLoggedIn ? (
            <Link to="/">
              <img src={logo} alt="Evangadi Logo" width={100} />
            </Link>
          ) : (
            <img src={logo} alt="Your Logo" width={100} />
          )}
        </div>
        <div className={classes.Sign_in}>
          <ul className={classes.nav_links}>
            <li>
              <Link to={"/"} className={classes.nav_button}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/howitworks"} className={classes.nav_button}>
                How it works
              </Link>
            </li>
            {isUserLoggedIn ? (
              <button onClick={handleLogout}>Sign Out</button>
            ) : (
              <Link to="/login">
                <button>Sign In</button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
