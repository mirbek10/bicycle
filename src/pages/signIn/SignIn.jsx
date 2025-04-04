import React from 'react';
import "./signin.scss";
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="sign-in">
      <div className="sign-content container">
        <div className="sign-menu">
          <Link to="/register"  className='regs-btn'>Регистрация</Link>
          <h1 className='signs-btn'>Войти</h1>
        </div>
        <div className="sign-inputs">
          <div className="sign-input">
            <p>E-mail</p>
            <input type="email" name="email" placeholder="Введите e-mail" />
          </div>
          <div className="sign-input">
            <p>Пароль</p>
            <input type="password" name="password" placeholder="Введите пароль" />
          </div>
          <div className="sign-short">
            <button>Войти</button>
            <div className="forget-password">
              <Link to="/forgot-password">
                <p className='forget-password-text'>Забыли пароль?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

