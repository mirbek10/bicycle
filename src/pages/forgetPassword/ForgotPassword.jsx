import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";  // Убедитесь, что путь правильный
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Обязательно импортировать стили
import "./forgotpassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isRequesting, setIsRequesting] = useState(false); // Для отслеживания запроса

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на корректность email перед отправкой
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Некорректный email. Проверьте формат.");
      return;
    }

    if (isRequesting) {
      toast.warning("Пожалуйста, подождите перед повторной отправкой.");
      return;
    }

    setIsRequesting(true);  // Начать отслеживание запроса

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Письмо для сброса пароля отправлено!", {
        autoClose: 1000,
      });
    } catch (err) {
      console.error("Ошибка при отправке письма: ", err);

      if (err.code === "auth/invalid-email") {
        setError("Некорректный email. Проверьте формат.");
      } else if (err.code === "auth/user-not-found") {
        setError("Пользователь с таким email не найден.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Ошибка сети. Пожалуйста, проверьте ваше соединение с интернетом.");
      } else if (err.code === "auth/expired-action-code") {
        setError("Ссылка для сброса пароля истекла. Попробуйте запросить новую.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Слишком много запросов. Попробуйте снова через несколько минут.");
      } else {
        setError("Неизвестная ошибка. Попробуйте снова.");
      }

      toast.error(error, {
        autoClose: 1000,
      });
    } finally {
      setIsRequesting(false); // Завершаем отслеживание запроса
    }
  };

  return (
    <div className="forgot-password container">
      <h2>Забыли пароль?</h2>
      <p>Укажите свой email. Ссылка для сброса пароля будет отправлена на почту.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button className="submit-btn" type="submit" disabled={isRequesting}>Сброс пароля</button>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;











