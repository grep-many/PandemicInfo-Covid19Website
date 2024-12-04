import './Header.css'
import logo from '../../assets/coro.png'
import React, { useRef } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Header = () => {
    const navMenu = useRef(null);

    const showNotification =  ()=> {
        navMenu.current.classList.toggle('show');
    }

    return (
        <header>
            <img src={logo} alt="Pandemic Info Logo" />
            <nav>
                <ul ref={navMenu}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="https://mohfw.gov.in/" target="_blank">MoHFW Website</a></li>
                    <li><a href="https://www.google.com/maps/search/hospitals near me" target="_blank">Hospitals</a></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
            <div className="menu-toggle" onClick={showNotification}>
                <span></span><span></span><span></span>
            </div>
        </header>
    );
}

export default Header;
