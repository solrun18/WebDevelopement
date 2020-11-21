import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => (
    <ul className="links">
    <li>
        <NavLink 
            exact to="/" 
            className="navigation-img">  <img src="src\resources\img\logo.png" width="70" height="65" alt="Viktor made this"/> </NavLink>
    </li>
        <li>
            <NavLink 
                exact to="/" 
                className="navigation-link"> Products </NavLink>
        </li>
        <li>
            <NavLink 
                exact to="/bundles" 
                className="navigation-link"> Bundles </NavLink>
        </li>
        <li>
            <NavLink 
                exact to="/about" 
                className="navigation-link"> About us </NavLink>
        </li>
        <li>
            <NavLink 
                exact to="/cart" 
                className="navigation-link"> Cart </NavLink>
        </li>
    </ul>
);

export default NavLinks;
/*
        <li><a href="#">Products</a></li>
        <li><a href="#">Bundles</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Cart</a></li>*/