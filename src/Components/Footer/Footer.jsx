import React, { useState, useEffect } from 'react';
import BicyclePerson from "../../assets/image/NurislamImg/bicyclePerson.png";
import { Link } from 'react-router-dom';
import logo from "../../assets/svg/logo.svg";
import locale from "../../assets/svg/locale.svg";
import email from "../../assets/svg/email.svg";
import phone from "../../assets/svg/phone.svg";
import { FiCheckCircle } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './footer.scss';

function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
  
      return () => clearTimeout(timer); 
    }
  }, [showModal]);

  useEffect(() => {
    if (error) {
      toast.error(error); 
    }
  }, [error]);

  const handleSubscribe = () => {
    if (!emailInput) {
      setError('Пожалуйста, введите ваш email.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      setError('Пожалуйста, введите корректный email.');
      return;
    }

    setShowModal(true);
    toast.success('Спасибо за подписку на новости!'); 

    setEmailInput('');
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='footer'>
        <div className="foot-banner">
          <div className="foot-left">
            <h1>Подпишитесь на наши новости</h1>
            <div className="foot-input">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder='E-mail'
              />
              <button onClick={handleSubscribe}>Подписаться</button>
            </div>
            {error && <p className="error-text">{error}</p>}
            <div className="foot-chek">
              <input type="checkbox" />
              <p>Согласен(на) на обработку персональных данных</p>
            </div>
          </div>
          <div className="foot-right">
            <img src={BicyclePerson} alt="" />
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <FiCheckCircle className="success-icon" />
                <p>Спасибо за подписку на новости!</p>
              </div>
            </div>
          )}
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
        <hr />
        <div className="footer-short container">
          <p>© 2023 world bike</p>
          <p>Пользовательское соглашение</p>
        </div>
      </div>

      
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Footer;


  






