import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/EvangadiLogoHeader.png';

const Header = ({ showLinks }) => {
    return (
        <nav className={`navbar ${showLinks ? 'login' : 'main'}`}>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="nav-links">
                {showLinks && (
                    <>
                        <Link to="/">HomeJJJ</Link>
                        <Link to="/howitworks">How It Works</Link>
                    </>
                )}
            </div>
            <Link to={showLinks ? "/login" : "/login"}>
                <button className={showLinks ? "login-sign-in" : "sign-in"}>
                    {showLinks ? "SIGN IN" : "SIGN IN"}
                </button>
            </Link>
        </nav>
    );
};

export default Header;
