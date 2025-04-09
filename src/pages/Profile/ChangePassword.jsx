import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '/src/firebase'; 
import EyeToggle from '../../Components/eye-password/EyeToggle';  
import "./profile.scss";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (newPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(user.email, oldPassword);


      await reauthenticateWithCredential(user, credential);


      await updatePassword(user, newPassword);


      toast.success('Пароль успешно изменен');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      setError('Ошибка при изменении пароля: ' + error.message);
    }
  };

  return (
    <div className="password-content">
      <h2>Смена Пароля</h2>
      <form className="password-form" onSubmit={handleChangePassword}>
        <div className="password-wrapper">
          <input
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <EyeToggle className="password-eye" showPassword={showOldPassword} togglePassword={() => setShowOldPassword(!showOldPassword)} />
        </div>

        <div className="password-wrapper">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <EyeToggle className="password-eye" showPassword={showNewPassword} togglePassword={() => setShowNewPassword(!showNewPassword)} />
        </div>

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Повторите новый пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <EyeToggle className="password-eye" showPassword={showConfirmPassword} togglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Изменить</button>
      </form>
    </div>
  );
}

export default ChangePassword;


