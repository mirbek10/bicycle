import React, { useState } from 'react';
import './signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '/src/firebase';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      setErrorMessage('Пожалуйста, введите ваш email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Пожалуйста, введите корректный email');
      return false;
    }
    if (!password) {
      setErrorMessage('Пожалуйста, введите ваш пароль');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const signInUser = async () => {
    if (!validateForm()) return;

    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), password);
      
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      dispatch(setAuth({
        isAuthenticated: true,
        user: userData,
      }));

      toast.success('Успешный вход!');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Неправильный email или пароль');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Некорректные учетные данные. Проверьте ваш email и пароль.');
      } else {
        toast.error('Ошибка входа: ' + error.message);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      dispatch(setAuth({
        isAuthenticated: true,
        user: userData,
      }));

      toast.success('Успешный вход через Google!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка входа через Google: ' + error.message);
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-content container">
        <div className="sign-menu">
          <Link to="/register" className="regs-btn">Регистрация</Link>
          <h1 className="signs-btn">Войти</h1>
        </div>
        <div className="sign-inputs">
          <div className="sign-input">
            <p>E-mail</p>
            <input
              type="email"
              name="email"
              placeholder="Введите e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sign-input">
            <p>Пароль</p>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="sign-short">
            <button onClick={signInUser}>Войти</button>
            <div className="forget-password">
              <Link to="/forgot-password">
                <p className="forget-password-text">Забыли пароль?</p>
              </Link>
            </div>
          </div>
          <div className="social-login">
            <p className="divider">Или войдите с помощью</p>
            <button className="google-btn" onClick={signInWithGoogle}>
              <FcGoogle className="google-icon" />
              <span>Войти через Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;