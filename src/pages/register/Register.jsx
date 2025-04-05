import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '/src/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './register.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setEmailError('Пожалуйста, введите корректный email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Пароли не совпадают');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateUsername = (username) => {
    if (!username) {
      setUsernameError('Имя пользователя не может быть пустым');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const handleCreateUser = async () => {
    if (!validateEmail(email) || !validatePassword(password) || !validateConfirmPassword(confirmPassword) || !validateUsername(username)) {
      toast.error('Пожалуйста, исправьте ошибки перед регистрацией');
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      if (res) {
        toast.success('Пользователь успешно создан');
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="register">
      <div className="register-content container">
        <div className="register-menu">
          <h1 className="reg-btn">Регистрация</h1>
          <Link to="/signIn" className="sign-btn">Войти</Link>
        </div>
        <div className="register-inputs">
          <div className="register-input">
            <p>Имя пользователя</p>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername(e.target.value);
              }}
            />
          </div>
          {usernameError && <p className="error-message">{usernameError}</p>}

          <div className="register-input">
            <p>E-mail</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              value={email}
              type="email"
            />
          </div>
          {emailError && <p className="error-message">{emailError}</p>}

          <div className="register-input">
            <p>Пароль</p>
            <div className="password-wrapper">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                value={password}
                type={showPassword ? 'text' : 'password'}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

          <div className="register-input">
            <p>Подтвердите пароль</p>
            <div className="password-wrapper">
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
              />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

          <div className="register-short">
            <button onClick={handleCreateUser} disabled={emailError || passwordError || confirmPasswordError || usernameError}>
              Регистрация
            </button>
            <p>Уже регистрировались? <Link to="/signIn"> Войти</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

