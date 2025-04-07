import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase";  // Убедитесь, что путь правильный
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get("mode");
    const code = urlParams.get("oobCode");
  
    if (mode !== "resetPassword") {
      setError("Неверный режим страницы.");
      return;
    }
  
    if (!code) {
      setError("Не найден код сброса пароля.");
      return;
    }
  
    setOobCode(code);
  
    // Проверка действительности кода сброса пароля
    verifyPasswordResetCode(auth, code)
      .then(() => {
        // Код действителен
      })
      .catch((err) => {
        setError("Недействительный код сброса пароля.");
        console.error(err);
      });
  }, [location]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Пароль успешно сброшен!");
      navigate("/signin");  // Перенаправление на страницу входа
    } catch (err) {
      console.error(err);
      setError("Ошибка при сбросе пароля. Попробуйте снова.");
      toast.error("Ошибка при сбросе пароля.");
    }
  };

  return (
    <div className="reset-password">
      <h2>Сброс пароля</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="Введите новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Сбросить пароль</button>
      </form>
    </div>
  );
};

export default ResetPassword;


