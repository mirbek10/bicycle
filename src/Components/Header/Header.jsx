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
                            <Link className='main-li' to="/"><li>Trade In</li></Link>
                            <li className='main-li' onMouseEnter={() => toggleSubMenuInHeader("bikes")} onMouseLeave={() => setOpenSubMenu(null)}>
                                Велосипеды
                                {openSubMenu === "bikes" && <ul className="sub-menu">{renderSubMenu(bicycles, "велосипедов")}</ul>}
                            </li>
                            <li className='main-li' onMouseEnter={() => toggleSubMenuInHeader("parts")} onMouseLeave={() => setOpenSubMenu(null)}>
                                Запчасти
                                {openSubMenu === "parts" && <ul className="sub-menu">{renderSubMenu(parts, "запчастей")}</ul>}
                            </li>
                            <li className='main-li' onMouseEnter={() => toggleSubMenuInHeader("equipment")} onMouseLeave={() => setOpenSubMenu(null)}>
                                Экипировка
                                {openSubMenu === "equipment" && <ul className='sub-menu'>{renderSubMenu(equipment, "экипировки")}</ul>}
                            </li>
                            <li className='main-li' onMouseEnter={() => toggleSubMenuInHeader("accessories")} onMouseLeave={() => setOpenSubMenu(null)}>
                                Аксессуары
                                {openSubMenu === "accessories" && <ul className="sub-menu">{renderSubMenu(accessories, "аксессуаров")}</ul>}
                            </li>
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

            {isMenuOpen && (
                <div className="sidebar-menu">
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
            )}
        </header>
    );
}

export default Header;
