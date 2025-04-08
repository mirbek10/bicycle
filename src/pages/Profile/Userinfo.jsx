import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Userinfo({ user }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    floor: '',
    apartment: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setFormData(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (err) {
        toast.error("Не удалось загрузить данные");
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, formData);
      toast.success("Данные успешно обновлены");
    } catch (err) {
      toast.error("Ошибка при обновлении данных");
    }
  };

  return (
    <div className="account-content">
      <h2>Персональные данные</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="displayName"
          placeholder="Отображаемое имя"
          value={formData.displayName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Город"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Улица"
          value={formData.street}
          onChange={handleChange}
        />
        <div className="form-row">
          <input
            type="text"
            name="house"
            placeholder="Дом"
            value={formData.house}
            onChange={handleChange}
          />
          <input
            type="text"
            name="floor"
            placeholder="Этаж"
            value={formData.floor}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apartment"
            placeholder="Квартира"
            value={formData.apartment}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Изменить</button>
      </form>
    </div>
  );
}

export default Userinfo;



