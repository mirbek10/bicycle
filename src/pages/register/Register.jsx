import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '/src/firebase';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { toast } from 'react-toastify';
import EyeToggle from '../../Components/eye-password/EyeToggle';
import './register.scss';
import { FcGoogle } from 'react-icons/fc';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
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
    if (!username.trim()) {
      setUsernameError('Имя пользователя не может быть пустым');
      return false;
    }
    if (username.length < 3) {
      setUsernameError('Имя пользователя должно содержать минимум 3 символа');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) ||
      !validatePassword(password) ||
      !validateConfirmPassword(confirmPassword) ||
      !validateUsername(username)) {
      toast.error('Пожалуйста, исправьте ошибки перед регистрацией');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/email-verified`,
        handleCodeInApp: true,
      });

      toast.success(
        <div>
          <p>Регистрация прошла успешно!</p>
          <p>Письмо с подтверждением отправлено на {email}</p>
        </div>,
        { autoClose: 5000 }
      );

      navigate('/verify-email-message', {
        state: { email }
      });

    } catch (error) {
      console.error('Ошибка регистрации:', error);

      let errorMessage = 'Ошибка при регистрации';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Этот email уже используется';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Неверный формат email';
          break;
        case 'auth/weak-password':
          errorMessage = 'Пароль слишком слабый';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Регистрация временно недоступна';
          break;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Пользователь успешно вошел через Google
      toast.success('Вы успешно вошли через Google');
      navigate('/'); // Перенаправляем на главную страницу или dashboard
    } catch (error) {
      console.error('Ошибка входа через Google:', error);
      let errorMessage = 'Ошибка при входе через Google';
      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Аккаунт с этим email уже существует';
      }
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register-content container">
        <div className="register-menu">
          <h1 className="reg-btn">Регистрация</h1>
          <Link to="/signIn" className="sign-btn">Войти</Link>
        </div>

        <form onSubmit={handleCreateUser} className="register-inputs">
          <div className="register-input">
            <p>Имя пользователя</p>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername(e.target.value);
              }}
              disabled={isLoading || isGoogleLoading}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>

          <div className="register-input">
            <p>E-mail</p>
            <input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              value={email}
              type="email"
              disabled={isLoading || isGoogleLoading}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="register-input">
            <p>Пароль</p>
            <div className="password-wrapper">
              <input
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                value={password}
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading || isGoogleLoading}
              />
              <EyeToggle className="eye-icon" showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)} />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="register-input">
            <p>Подтвердите пароль</p>
            <div className="password-wrapper">
              <input
                id="confirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                disabled={isLoading || isGoogleLoading}
              />
              <EyeToggle
                className="eye-icon"
                showPassword={showConfirmPassword}
                togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>

          <div className="register-short">
            <button
              type="submit"
              disabled={
                isLoading ||
                isGoogleLoading ||
                emailError ||
                passwordError ||
                confirmPasswordError ||
                usernameError ||
                !email ||
                !password ||
                !confirmPassword ||
                !username
              }
            >
              {isLoading ? 'Регистрация...' : 'Регистрация'}
            </button>
            
            <div className="google-auth">
              <p>Или</p>
              <button 
                type="button" 
                className="google-btn"
                onClick={signInWithGoogle}
                disabled={isLoading || isGoogleLoading}
              >
                <FcGoogle className="google-icon" />
                {isGoogleLoading ? 'Вход...' : 'Войти через Google'}
              </button>
            </div>
            
            <p>Уже регистрировались? <Link to="/signIn">Войти</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;