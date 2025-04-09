import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../store/authSlice"; 
import { useNavigate } from 'react-router-dom';
import Userinfo from './Userinfo';
import OrderHistory from './OrderHistory';
import ChangePassword from './ChangePassword';  
import "./profile.scss";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState("userinfo");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signIn');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/'); 
  };


  const renderContent = () => {
    switch (activeTab) {
      case "userinfo":
        return <Userinfo user={user} />;
      case "orderhistory":
        return <OrderHistory />;
      case "changepassword":
        return <ChangePassword />;
      default:
        return <Userinfo user={user} />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="account-container container">
      <aside className="account-menu">
        <h2>Мой аккаунт</h2>
        <hr />
        <ul>
          <li onClick={() => setActiveTab("userinfo")}>Персональные данные</li>
          <li onClick={() => setActiveTab("orderhistory")}>История заказов</li>
          <li onClick={() => setActiveTab("changepassword")}>Смена пароля</li>
          <li onClick={handleLogout}>Выйти</li>
        </ul>
      </aside>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;





