import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import logo from '../Assets/new_logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt="" />
            <p>Wιɳƙ&Wҽαɾ</p>
        </div>
        <ul className="footer-links">
            <li>
                <Link className="nav-link" to="/about">Company</Link>
            </li>
            <li>
                <Link className="nav-link" to="/">Products</Link>
            </li>

            <li onClick={() => setMenu("about")}>
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li>
                <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li>
                <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
                <Link className="nav-link" to="/return-exchange">Return & Exchange</Link>
            </li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2026-All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer