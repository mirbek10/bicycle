import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBicycles } from "../../store/bikeSlice";
import { fetchAccessories } from "../../store/accessoriesSlice";
import { fetchParts } from "../../store/partsSlice";
import { getEquipment } from '../../store/Equipmentslice/EquipmentSLice';
import { Link, useNavigate } from 'react-router-dom';
import { navigateWithAuth } from '../../shared/hooks/navigateWithAuth';

import logo from "../../assets/svg/logo.svg";
import logoB from "../../assets/svg/logoBlack.svg";
import heart from "../../assets/svg/heart.svg";
import cart from "../../assets/svg/cart.svg";
import search from "../../assets/svg/search.svg";
import profile from "../../assets/svg/profile.svg";
import menuIcon from "../../assets/svg/menu.svg";
import { IoClose } from "react-icons/io5";
import { FaSearch, FaRegUser,FaRegHeart, FaShoppingCart } from 'react-icons/fa';

import './header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(fetchBicycles());
        dispatch(fetchAccessories());
        dispatch(fetchParts());
        dispatch(getEquipment());
    }, [dispatch]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const menuLinks = [
        { to: '/about', label: 'О нас' },
        { to: '/ProductList', label: 'Блог' },
        { to: '/contact', label: 'Контакты' },
        { to: '/workshop', label: 'Веломастерская' },
        { to: '/guarantees', label: 'Гарантии' },
        { to: '/userAgreement', label: 'Пользовательское соглашение' },
        { to: '/deliveryAndPayment', label: 'Доставка и оплата' },
        { to: '/catalog', label: 'Каталог' }
    ];

    const [LinksActive , setLinksActive] = useState('');
    const [modalIcon, setmodalIcon] = useState('');
    
    
    const renderIcons = (
        <div className="sidebar-icons">
          <FaSearch 
            size={20} 
            onClick={() => {
              setLinksActive("search");
              setmodalIcon('search');
            }} 
            style={LinksActive === "search"  ? { color: 'rgb(245, 117, 32)' } : {}}
          />
      
          {isAuth ? (
            <FaRegUser
              size={20} 
              onClick={() => {
                setLinksActive("profile");
                setmodalIcon('profile');
                navigateWithAuth(isAuth, navigate, "/profile");
              }}
              style={LinksActive === "profile"? { color: 'rgb(245, 117, 32)' } : {}}
            />
          ) : (
            <Link 
              to="/signIn" 
              onClick={() => {
                setLinksActive("profile");
                setmodalIcon('profile');
              }}
              style={{ color: LinksActive === "profile"  ? 'rgb(245, 117, 32)' : 'inherit' }}
            >
              <FaRegUser size={20} />
            </Link>
          )}
      
          <FaRegHeart
            size={20} 
            onClick={() => {
              setLinksActive("favorites");
              setmodalIcon('favorites');
            }} 
            style={LinksActive === "favorites"  ? { color: 'rgb(245, 117, 32)' } : {}}
          />
      
          <FaShoppingCart 
            size={20} 
            onClick={() => {
              setLinksActive("cart");
              setmodalIcon('cart');
              navigateWithAuth(isAuth, navigate, "/cart");
            }}
            style={LinksActive === "cart"?  { color: 'rgb(245, 117, 32)' } : {}}
          />
        </div>
      );
    return (
        <header className='header'>
            <div className="header-content container">
                <div className="header-left">
                    <Link to="/"><img  onClick={()=>setLinksActive('')}  src={logo} alt="Logo" /></Link>
                </div>
                <div className="header-right">
                    <div className="main-menu">
                        <ul>
                            {menuLinks.map(({ to, label }) => (
                                <Link  key={to} to={to}><li onClick={()=>setLinksActive(label)} className={`'main-li' ${LinksActive === label ? 'link-active':''}`}>{label}</li></Link>
                            ))}
                        </ul>
                    </div>
                    <div className="logo-menu">{renderIcons}</div>
                    <div className="header-menu">
                        <img src={menuIcon} alt="Menu" onClick={toggleMenu} />
                    </div>
                </div>
            </div>

            <div className={`sidebar-menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <img src={logoB} alt="Logo Black" />
                    <IoClose className="close-icon" onClick={toggleMenu} />
                </div>
                <ul className="sidebar-links">
                    {menuLinks.map(({ to, label }) => (
                        <Link to={to} onClick={()=>setmodalIcon(label)} 
                        key={to} className={`'sid-link' ${modalIcon === label? 'link-modal-active':""} `}
                        ><li>{label}</li></Link>
                    ))}
                </ul>
                {renderIcons}
            </div>
        </header>
    );
};

export default Header;
