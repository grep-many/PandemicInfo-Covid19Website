import './Header.css'
import logo from '../../assets/coro.png'
import React, { useRef } from 'react';

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
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="https://mohfw.gov.in/" target="_blank">MoHFW Website</a></li>
                    <li><a href="https://www.google.com/maps/search/hospitals near me" target="_blank">Hospitals</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
            <div className="menu-toggle" onClick={showNotification}>
                <span></span><span></span><span></span>
            </div>
        </header>
    );
}

export default Header;
