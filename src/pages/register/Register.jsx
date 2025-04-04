import React from 'react'
import { Link } from 'react-router-dom'
import "./register.scss"

function Register() {
  return (
    <div>
      <div className="register">
        <div className="register-content container">
            <div className="register-menu">
                <h1 className='reg-btn'>Регистрация</h1>
                <Link to="/signIn" className='sign-btn'>Войти</Link>
            </div>
            <div className="register-inputs">
                <div className="register-input">
                    <p>Имя пользователя</p>
                    <input type="text" />
                </div>
                <div className="register-input">
                    <p>E-mail</p>
                    <input type="email" />
                </div>
                <div className="register-input">
                    <p>Пароль</p>
                    <input type="password"  />
                </div>
                <div className="register-input">
                    <p>Подтвердите пароль</p>
                    <input type="password" />
                </div>
                <div className="register-short">
                    <button>Регистрация</button>
                    <p>Уже регистрировались? <Link to="/signIn"> Войти</Link></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register
