import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBicycles } from "../../store/bikeSlice";
import { fetchAccessories } from "../../store/accessoriesSlice";
import { fetchParts } from "../../store/partsSlice";
import { getEquipment } from '../../store/Equipmentslice/EquipmentSLice';
import logo from "../../assets/svg/logo.svg";
import logoB from "../../assets/svg/logoBlack.svg";
import heart from "../../assets/svg/heart.svg";
import cart from "../../assets/svg/cart.svg";
import search from "../../assets/svg/search.svg";
import profile from "../../assets/svg/profile.svg";
import menuIcon from "../../assets/svg/menu.svg";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);

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
        setIsMenuOpen(prevState => !prevState);
    };

    const toggleSubMenuInHeader = (menuId) => {
        setOpenSubMenu(openSubMenu === menuId ? null : menuId);
    };

    const renderSubMenu = (data, categoryName) => {
        if (data.length === 0) {
            return <li className="no-data">{`Нет доступных ${categoryName}`}</li>;
        }
        return data.map(item => <li key={item.id}>{item.name}</li>);
    };

    const handleProfileClick = () => {
        if (isAuth) {
            navigate("/profile");
        } else {
            navigate("/signIn");
        }
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
                            {/* <Link to='/'><li className='main-li'>Главное</li></Link> */}
                            <Link to='/about'><li className='main-li'>О нас</li></Link>
                            <Link to='/contact'><li className='main-li'>Контакты</li></Link>
                            <Link to='workshop'><li className='main-li'>Веломастерская</li></Link>
                            <Link><li className='main-li'>Гарантии</li></Link>
                            <Link><li className='main-li'>Пользовательское соглашение</li></Link>
                            <Link><li className='main-li'>Доставка и оплата</li></Link>
                            <Link><li className='main-li'>Блог</li></Link>
                            <Link><li className='main-li'>Контакты</li></Link>
                            <Link to='/catalog'><li className='main-li'>Каталог</li></Link>
                        </ul>
                    </div>
                    <div className="logo-menu">
                        <img src={search} alt="Search" />
                        {isAuth ? (
                            <img src={profile} alt="Profile" onClick={handleProfileClick} />
                        ) : (
                            <Link to="/signIn"><img src={profile} alt="Profile" /></Link>
                        )}
                        <img src={heart} alt="Favorites" />
                        <Link to='/cart'>
                            <img src={cart} alt="Cart" />
                        </Link>
                    </div>
                    <div className="header-menu">
                        <img src={menuIcon} alt="Menu" onClick={toggleMenu} />
                    </div>
                </div>
            </div>

            
                <div className={`sidebar-menu ${isMenuOpen ? 'active':''}`}>
                    <div className="sidebar-header">
                        <img src={logoB} alt="Logo Black" />
                        <IoClose className="close-icon" onClick={toggleMenu} />
                    </div>

                    <ul className="sidebar-links">

                        <li><Link to="/" className='sid-link'>О нас</Link></li>
                        <li><Link to="/" className='sid-link'>Веломастерская</Link></li>
                        <li><Link to="/" className='sid-link'>Хранение</Link></li>
                        <li><Link to="/" className='sid-link'>Гарантии</Link></li>
                        <li><Link to="/" className='sid-link'>Пользовательское соглашение</Link></li>
                        <li><Link to="/" className='sid-link'>Доставка и оплата</Link></li>
                        <li><Link to="/" className='sid-link'>Блог</Link></li>
                        <li><Link to="/" className='sid-link'>Контакты</Link></li>

         </ul>

                    <div className="sidebar-icons">
                        <img src={search} alt="Search" />
                        {isAuth ? (
                            <img src={profile} alt="Profile" onClick={handleProfileClick} />
                        ) : (
                            <Link to="/signIn"><img src={profile} alt="Profile" /></Link>
                        )}
                        <img src={heart} alt="Favorites" />
                        <Link to='/cart'>
                            <img src={cart} alt="Cart" />
                        </Link>
                    </div>
                </div>
          
        </header>
    );
}

export default Header;
