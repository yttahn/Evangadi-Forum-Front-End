import React from 'react';
import './Footer.css';
import logo from '../../assets/logoFooter.png';
import {FaInstagram, FaYoutube } from "react-icons/fa";
import { RiFacebookFill} from "react-icons/ri";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <img src={logo} alt="Logo" className="footer-logo" />
                <div className="social-icons">
                    <a href="https://www.facebook.com/evangaditech" target="_blank" rel="" className="icon-circle">
                        <RiFacebookFill className="icon" />
                    </a>
                    <a href="https://www.instagram.com/evangaditech/" target="_blank" rel="" className="icon-circle">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="https://www.youtube.com/@EvangadiTech" target="_blank" rel="" className="icon-circle">
                        <FaYoutube className="icon" />
                    </a>
                </div>
            </div>
            <div className="footer-column">
                <h3>Useful Links</h3>
                <ul>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#terms-of-service">Terms of Service</a></li>
                    <li><a href="#privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Contact Info</h3>
                <p>Evangadi Networks</p>
                <p>support@evangadi.com</p>
                <p>+1202386-2702</p>
            </div>
        </footer>
    );
};

export default Footer;
