import React, { useState } from 'react';
import { PiCursorClickBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDetail } from '../../../store/Details/Details';
import { checkout } from '../../../store/cart/CartSlise';
import { toast } from 'react-toastify';
import './CatalogCard.scss';

function CatalogCard({ el }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const handleClick = () => {
        if (isAuth) {
            setIsOpen(!isOpen);
            setErrors({});
            setIsSuccess(false);
            dispatch(setDetail(el));
            

        } else {
            navigate('/signIn');
            toast.error('Для продолжения необходимо авторизоваться');
        }

    }

    const handleViewDetails = () => {
        dispatch(setDetail(el));
        navigate('/product-details');
    }

    const generateOrderNumber = () => {
        return `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Пожалуйста, введите ваше имя';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Пожалуйста, введите ваш телефон';
        } else if (!/^[\d\+]{7,15}$/.test(formData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            const orderNum = generateOrderNumber();
            setOrderNumber(orderNum);

            const orderData = {
                orderNumber: orderNum,
                items: [{
                    id: el.id,
                    name: el.name,
                    price: el.price,
                    image: el.image,
                    quantity: 1
                }],
                total: el.price,
                customer: {
                    name: formData.name,
                    phone: formData.phone
                }
            };

            setTimeout(() => {
                dispatch(checkout(orderData));

                setIsSubmitting(false);
                setIsSuccess(true);

                setTimeout(() => {
                    setFormData({ name: '', phone: '' });
                    setIsSuccess(false);
                    setIsOpen(false);
                }, 3000);
            }, 1500);
        }
    }

    return (
        <>
            <div className="bike-card">
                <div onClick={handleViewDetails} className={`sold-out-label ${el.buying ? 'В-наличии' : 'Распродано'}`}>
                    {el.buying ? 'В наличии' : 'Распродано'}
                </div>

                <div className="bike-image-container" onClick={handleViewDetails}>
                    <img src={el.image} className="bike-image" alt={el.name} />
                </div>

                <div className="bike-info">
                    <h2 className="bike-model">{el.name}</h2>
                    <p className="bike-price">{el.price}₽</p>
                </div>
                <div className="bike-actions">
                    <button onClick={handleClick} disabled={!el.buying}>
                        <PiCursorClickBold /> Купить сейчас
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="bike-card__overlay">
                    <div className="bike-card__details">
                        <div className='bike-card__details-header'>
                            <h3>Оформление заказа</h3>
                            <button onClick={handleClick}>×</button>
                        </div>
                        <div className='bike-card__details-content'>
                            <div className='bike-card__details-image'>
                                <img src={el.image} alt={el.name} />
                                <h4>{el.name}</h4>
                                <p className="bike-price">{el.price}₽</p>
                            </div>
                            <form className='bike-card__details-form' onSubmit={handleSubmit}>
                                <h4>Укажите ваше имя и телефон для оформления заказа</h4>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Имя"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Телефон"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                                </div>

                                <h4>Нажимая на кнопку, вы соглашаетесь с условиями обработки данных</h4>

                                <button
                                    type="submit"
                                    className='color-button'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
                                </button>

                                {isSuccess && (
                                    <div className="success-message">
                                        <p>Заказ №{orderNumber} успешно оформлен!</p>
                                        <p>Менеджер свяжется с вами для подтверждения.</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CatalogCard;