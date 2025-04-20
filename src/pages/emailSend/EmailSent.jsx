import React from "react";
import "./emailsent.scss";

const EmailSent = () => {
  const handleLogin = () => {
    // Перенаправление на страницу входа, например:
    window.location.href = "/signIn";
  };

  return (
    <div className="email-sent container">
      <h2>Письмо отправлено</h2>
      <p>
        Письмо со ссылкой для сброса пароля было направлено на адрес электронной почты,
        привязанный к вашей учетной записи. Доставка сообщения может занять несколько минут.
        Пожалуйста, подождите не менее 10 минут, прежде чем инициировать ещё один запрос.
      </p>
      <button className="login-btn" onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default EmailSent;



