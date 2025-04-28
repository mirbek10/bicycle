import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Account.scss';
import BikeLoader from '../../../shared/loader/BikeLoader';

function Account() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    photoURL: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    floor: '',
    apartment: ''
  });
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setNewPhotoURL(data.photoURL || '');
        } else {
          const basicData = {
            username: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            firstName: '',
            lastName: '',
            phone: '',
            city: '',
            street: '',
            house: '',
            floor: '',
            apartment: ''
          };
          setUserData(basicData);
          setNewPhotoURL(user.photoURL || '');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const updatedInfo = {
      ...userData,
      photoURL: newPhotoURL
    };

    try {
      await setDoc(doc(db, 'users', user.uid), updatedInfo);
      setUserData(updatedInfo);
      // Анимация успешного сохранения
      const saveBtn = document.querySelector('.save-btn');
      if (saveBtn) {
        saveBtn.classList.add('success');
        setTimeout(() => saveBtn.classList.remove('success'), 2000);
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || isLoading) return <BikeLoader/>;

  return (
    <div className="account container animated-fade">
      <h2 className="profile-title">Профиль пользователя</h2>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <div className={`avatar ${userData.photoURL ? 'has-image' : 'no-image'}`}>
              {userData.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  alt="avatar" 
                  className="avatar-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              ) : (
                <div className="avatar-initials">
                  {userData.firstName?.[0]?.toUpperCase()}
                  {userData.lastName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="avatar-overlay">
              <span>Изменить</span>
            </div>
          </div>

          <div className="profile-main-info">
            <h3 className="profile-name">
              {userData.firstName} {userData.lastName}
              {userData.username && userData.username !== `${userData.firstName} ${userData.lastName}` && (
                <span className="profile-display-name">({userData.username})</span>
              )}
            </h3>
            <p className="profile-email">{userData.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Телефон:</span>
            <span className="detail-value">{userData.phone || 'Не указан'}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Адрес:</span>
            <span className="detail-value">
              {[userData.city, userData.street, userData.house].filter(Boolean).join(', ')}
              {(userData.floor || userData.apartment) && (
                <span className="address-additional">
                  {userData.floor && `, этаж ${userData.floor}`}
                  {userData.apartment && `, кв. ${userData.apartment}`}
                </span>
              )}
              {!userData.city && !userData.street && !userData.house && 'Не указан'}
            </span>
          </div>
        </div>

        <div className="profile-edit">
          <div className="form-group floating-label">
            <input
              type="url"
              id="photoUrl"
              value={newPhotoURL}
              onChange={(e) => setNewPhotoURL(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="photoUrl">Ссылка на новое фото</label>
            <div className="input-underline"></div>
          </div>

          <button 
            onClick={handleSave} 
            className={`save-btn ${isSaving ? 'saving' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="btn-spinner"></span>
            ) : (
              'Сохранить изменения'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;