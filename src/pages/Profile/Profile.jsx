import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../store/authSlice"; // Импортируем экшн для выхода
import { useNavigate } from 'react-router-dom';
import "./profile.scss"
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Получаем статус авторизации из Redux

  console.log("IsAuthenticated: ", isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser()); // Вызываем экшн выхода
    navigate('/'); // Перенаправляем на главную страницу
  };

  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    navigate('/signIn');
    return null; // Можно вернуть null, чтобы ничего не рендерить
  }

  return (
    <div className="profile container">
      <h1>Добро пожаловать в Личный Кабинет</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Profile;


