import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './verifyEmailMessage.scss';

function VerifyEmailMessage() {
  const location = useLocation();
  const email = location.state?.email || 'ваш email';

  return (
    <div className="verify-email-message container">
      <div className="verify-email-content">
        <h2>Подтвердите ваш email</h2>
        <p>
          Мы отправили письмо с подтверждением на {email}. 
          Пожалуйста, проверьте вашу почту и перейдите по ссылке в письме.
        </p>
        <p>
          Не получили письмо? <Link to="/resend-verification">Отправить повторно</Link>
        </p>
        <p>
          <Link to="/">Вернуться на главную</Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmailMessage;