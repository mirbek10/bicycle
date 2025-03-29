import React from 'react';
import BicyclePerson from "../../assets/image/NurislamImg/bicyclePerson.png"
import { Link } from 'react-router-dom';
import logo from "../../assets/svg/logo.svg"
import locale from "../../assets/svg/locale.svg"
import email from "../../assets/svg/email.svg"
import phone from "../../assets/svg/phone.svg"
import './Footer.scss';


function Footer() {
  return (
    <div>
    <div className='footer'>
        <div className="foot-banner">
            <div className="foot-left">
                <h1>Подпишитесь на наши новости</h1>
                <div className="foot-input">
                <input type="text" placeholder='E-mail' />
                <button>Подписаться</button>
                </div>
                <div className="foot-chek">
                <input type="checkbox"/>
                <p>Согласен(на) на обработку персональных данных</p>
                </div>
            </div>
            <div className="foot-right">
                <img src={BicyclePerson} alt="" />
            </div>
        </div>
        <div className="footer-content container">
          <div className="footer-logo">
            <img src={logo} alt="" />
            <p>Компания World-bikes <br />
             специализируется на продаже <br />
              товаров для велосипедного спорта.</p>
          </div>
          <div className="footer-menu">
            <ul>
            <h3>Каталог</h3>
           <Link to="" className='foot-link'><li>Trade-in</li></Link>
           <Link to="" className='foot-link'><li>Велосипеды</li></Link>
           <Link to="" className='foot-link'><li>Экипировка</li></Link>
           <Link to="" className='foot-link'><li>Запчасти</li></Link>
           <Link to="" className='foot-link'><li>Велостанки</li></Link>
           <Link to="" className='foot-link'><li>Аксессуары</li></Link>
            </ul>

            <ul>
              <h3>Для клиента</h3>
            <Link to="" className='foot-link'><li>О нас</li></Link>
           <Link to="" className='foot-link'><li>Доставка и оплата</li></Link>
           <Link to="" className='foot-link'><li>Блог</li></Link>
           <Link to="" className='foot-link'><li>Контакты</li></Link>
           <Link to="" className='foot-link'><li>Веломастерская</li></Link>
           <Link to="" className='foot-link'><li>Хранение</li></Link>
           <Link to="" className='foot-link'><li>Гарантии</li></Link>
            </ul> 

            <ul>
              <h3>Контакты</h3>
            <div className="footer-tell">
              <img src={phone} alt="" />
              <div className="footer-number">
                <p>+996 550 01 14 78</p>
                <p>+7(965)142-22-99</p>
              </div>
            </div>
            <div className="footer-tell">
              <img src={locale} alt="" />
              <div className="footer-number">
                <p>г. Москва, ул. <br />
                 Доватора, 7/8 с1</p>
            </div>
            </div>
            <div className="footer-tell">
              <img src={email} alt="" />
              <div className="footer-number">
                <p>order@world-bike.ru</p>
            </div>
            </div>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="footer-short container">
        <p>© 2023 world bike</p>
        <p>Пользовательское соглашение</p>
        </div>
    </div>
    </div>
  )
}

export default Footer
