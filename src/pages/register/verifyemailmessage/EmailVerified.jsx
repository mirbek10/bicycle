import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '/src/firebase';
import './emailVerified.scss';

function EmailVerified() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        clearInterval(interval);
        setChecking(false);
        setTimeout(() => navigate('/profile'), 3000);
      }
    }, 10000); // каждые 10 секунд

    // Первая проверка сразу
    (async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        setChecking(false);
        clearInterval(interval);
        setTimeout(() => navigate('/profile'), 3000);
      }
    })();

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="email-verified container">
      <div className="email-verified-content">
        <h2>Email успешно подтверждён!</h2>
        <p>Сейчас вы будете перенаправлены в ваш профиль.</p>
        <p>
          Если перенаправление не произошло, <Link to="/profile">нажмите здесь</Link>.
        </p>
        {checking && (
          <div className="spinner-container">
            <div className="spinner" />
            <p>Проверяем подтверждение email...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerified;
