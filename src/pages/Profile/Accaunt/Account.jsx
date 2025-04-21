import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Account.scss';

function Account() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    photoURL: ''
  });
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          setNewPhotoURL(docSnap.data().photoURL || '');
        } else {
          setUserInfo({
            username: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || ''
          });
          setNewPhotoURL(user.photoURL || '');
        }
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    const updatedInfo = {
      ...userInfo,
      photoURL: newPhotoURL
    };

    try {
      await setDoc(doc(db, 'users', user.uid), updatedInfo);
      setUserInfo(updatedInfo);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="account container">
      <h2>Профиль</h2>

      <div className="account-info">
        <div className="avatar">
          {userInfo.photoURL ? (
            <img src={userInfo.photoURL} alt="avatar" />
          ) : (
            <div className="no-avatar">Нет фото</div>
          )}
        </div>

        <div className="details">
          <p><strong>Имя:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      </div>

      <div className="edit-section">
        <label htmlFor="photoUrl">Ссылка на фото</label>
        <input
          type="url"
          id="photoUrl"
          className={newPhotoURL ? 'narrow' : ''}
          value={newPhotoURL}
          onChange={(e) => setNewPhotoURL(e.target.value)}
          placeholder="Вставьте URL изображения"
        />
        <button onClick={handleSave}>Сохранить изменения</button>
      </div>
    </div>
  );
}

export default Account;
