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
import menuIcon from "../../assets/svg/menu.svg";
import { IoClose } from "react-icons/io5";
import { FaSearch, FaRegUser, FaRegHeart, FaShoppingCart } from 'react-icons/fa';

import './header.scss';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { bicycles } = useSelector(state => state.bike);
  const { accessories } = useSelector(state => state.accessories);
  const { parts } = useSelector(state => state.parts);
  const { data: equipment } = useSelector(state => state.equipment);
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchBicycles());
    dispatch(fetchAccessories());
    dispatch(fetchParts());
    dispatch(getEquipment());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className='header'>
      <div className="header-content container">
        <div className="header-left">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="header-right">
          <div className="main-menu">
            <ul>
              <Link to='/about'><li className='main-li'>О нас</li></Link>
              <Link to='/contact'><li className='main-li'>Контакты</li></Link>
              <Link to='/workshop'><li className='main-li'>Веломастерская</li></Link>
              <Link to="/guarantees"><li className='main-li'>Гарантии</li></Link>
              <Link to='/userAgreement'><li className='main-li'>Пользовательское соглашение</li></Link>
              <Link to='/deliveryAndPayment'><li className='main-li'>Доставка и оплата</li></Link>
              <Link to='/'><li className='main-li'>Блог</li></Link>
              <Link to='/catalog'><li className='main-li'>Каталог</li></Link>
            </ul>
          </div>

          <div className="logo-menu">
            <img src={search} alt="Search" />
            <div onClick={() => navigateWithAuth(isAuth, navigate, "/profile")} style={{ cursor: 'pointer' }}>
              <img src={profile} alt="Profile" />
            </div>
            <img src={heart} alt="Favorites" />
            <div onClick={() => navigateWithAuth(isAuth, navigate, "/cart")} style={{ cursor: 'pointer' }}>
              <img src={cart} alt="Cart" />
            </div>
          </div>

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
          <li><Link to="/trade-in" className='sid-link'>Trade In</Link></li>
          <li><Link to="/bicycles" className='sid-link'>Велосипеды</Link></li>
          <li><Link to="/parts" className='sid-link'>Запчасти</Link></li>
          <li><Link to="/equipment" className='sid-link'>Экипировка</Link></li>
          <li><Link to="/accessories" className='sid-link'>Аксессуары</Link></li>
          <li><Link to="/trainers" className='sid-link'>Велостанки</Link></li>
          <li><Link to="/about" className='sid-link'>О нас</Link></li>
          <li><Link to="/workshop" className='sid-link'>Веломастерская</Link></li>
          <li><Link to="/contact" className='sid-link'>Контакты</Link></li>
          <li><Link to="/guarantees" className='sid-link'>Гарантии</Link></li>
          <li><Link to="/deliveryAndPayment" className='sid-link'>Доставка и оплата</Link></li>
          <li><Link to="/" className='sid-link'>Хранение</Link></li>
          <li><Link to="/" className='sid-link'>Блог</Link></li>
          <li><Link to="/userAgreement" className='sid-link'>Пользовательское соглашение</Link></li>
          <li><Link to="/review" className='sid-link'>Отзывы</Link></li>

        </ul>

        <div className="sidebar-icons">
          <img src={search} alt="Search" />
          <div onClick={() => navigateWithAuth(isAuth, navigate, "/profile")} style={{ cursor: 'pointer' }}>
            <img src={profile} alt="Profile" />
          </div>
          <img src={heart} alt="Favorites" />
          <div onClick={() => navigateWithAuth(isAuth, navigate, "/cart")} style={{ cursor: 'pointer' }}>
            <img src={cart} alt="Cart" />
          </div>
        </div>
      </div>
    </header>
  );
}

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

  const [LinksActive, setLinksActive] = useState('');
  const [modalIcon, setmodalIcon] = useState('');

  const handleClick = () => {

    navigate('/catalog#focus');
    setLinksActive("search");
    setmodalIcon('search');
  };


  const renderIcons = (
    <div className="sidebar-icons">
      <FaSearch
        size={20}
        onClick={handleClick}
        style={LinksActive === "search" ? { color: 'rgb(245, 117, 32)' } : {}}
      />

      {isAuth ? (
        <FaRegUser
          size={20}
          onClick={() => {
            setLinksActive("profile");
            setmodalIcon('profile');
            navigateWithAuth(isAuth, navigate, "/profile");
          }}
          style={LinksActive === "profile" ? { color: 'rgb(245, 117, 32)' } : {}}
        />
      ) : (
        <Link
          to="/signIn"
          onClick={() => {
            setLinksActive("profile");
            setmodalIcon('profile');
          }}
          style={{ color: LinksActive === "profile" ? 'rgb(245, 117, 32)' : 'inherit' }}
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
        style={LinksActive === "favorites" ? { color: 'rgb(245, 117, 32)' } : {}}
      />

      <FaShoppingCart
        size={20}
        onClick={() => {
          setLinksActive("cart");
          setmodalIcon('cart');
          navigateWithAuth(isAuth, navigate, "/cart");
        }}
        style={LinksActive === "cart" ? { color: 'rgb(245, 117, 32)' } : {}}
      />
    </div>
  );
  return (
    <header className='header'>
      <div className="header-content container">
        <div className="header-left">
          <Link to="/"><img onClick={() => setLinksActive('')} src={logo} alt="Logo" /></Link>
        </div>
        <div className="header-right">
          <div className="main-menu">
            <ul>
              {menuLinks.map(({ to, label }) => (
                <Link key={to} to={to}><li onClick={() => setLinksActive(label)} className={`'main-li' ${LinksActive === label ? 'link-active' : ''}`}>{label}</li></Link>
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
            <Link to={to} onClick={() => { setmodalIcon(label); setLinksActive(label); setIsMenuOpen(false); }}
              key={to} className={`'sid-link' ${modalIcon === label ? 'link-modal-active' : ""} `}
            ><li>{label}</li></Link>
          ))}
        </ul>

      </div>
    </header>
  );
};


export default Header;
