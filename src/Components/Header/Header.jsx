import React from 'react';
import logo from "../../assets/svg/logo.svg";
import heart from "../../assets/svg/heart.svg";
import cart from "../../assets/svg/cart.svg";
import search from "../../assets/svg/search.svg";
import profile from "../../assets/svg/profile.svg";
import menu from "../../assets/svg/menu.svg";
import { Link } from 'react-router-dom';
import './header.scss';

function Header() {
    return (
        <header className='header'>
            <div className="header-content container">
                <div className="header-left">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="header-right">
                    <div className="main-menu">
                        <ul>
                            <Link className='main-li'><li>Trade In</li></Link>
                            <Link className='main-li'><li>Велосипеды</li></Link>
                            <Link className='main-li'><li>Запчасти</li></Link>
                            <Link className='main-li'><li>Экипировка</li></Link>
                            <Link className='main-li'><li>Аксессуары</li></Link>
                            <Link className='main-li'><li>Велостанки</li></Link>
                        </ul>
                    </div>
                    <div className="logo-menu">
                        <img src={search} alt="Search" />
                        <img src={profile} alt="Profile" />
                        <img src={heart} alt="Favorites" />
                        <img src={cart} alt="Cart" />
                    </div>
                    <div className="header-menu">
                        <img src={menu} alt="Menu" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
