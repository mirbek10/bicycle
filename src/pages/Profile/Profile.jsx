import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../store/authSlice"; 
import { useNavigate, useSearchParams } from 'react-router-dom'; // Добавляем useSearchParams
import Userinfo from './Userinfo';
import OrderHistory from './OrderHistory';
import ChangePassword from './ChangePassword';  
import "./profile.scss";
import WhishList from '../whishList/WhishList';
import Account from './Accaunt/Account';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Получаем параметры URL
  const tabParam = searchParams.get('tab'); // Получаем параметр tab

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState("myAcc");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signIn');
    }
    
    // Если в URL есть параметр tab, активируем соответствующую вкладку
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [isAuthenticated, navigate, tabParam]);

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
      case "whishlist":
        return <WhishList/>;
      case "myAcc":
        return <Account info={user}/>;  
      default:
        return <Account info={user} />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="account-container container">
      <aside className="account-menu">
        <h2 onClick={()=> setActiveTab("myAcc")}>Мой аккаунт</h2>
        <hr />
        <ul>
          <li className={activeTab === 'userinfo'? 'active':''} onClick={() => setActiveTab("userinfo")}>Персональные данные</li>
          <li className={activeTab === 'orderhistory'? 'active':''} onClick={() => setActiveTab("orderhistory")}>История заказов</li>
          <li className={activeTab === 'changepassword'? 'active':''} onClick={() => setActiveTab("changepassword")}>Смена пароля</li>
          <li className={activeTab ==='whishlist' ? "active":'' } onClick={()=>setActiveTab('whishlist')}>Список желаний</li>
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