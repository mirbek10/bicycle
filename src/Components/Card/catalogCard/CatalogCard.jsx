import React, { useState } from 'react'
import { PiCursorClickBold } from "react-icons/pi";
import './CatalogCard.scss'

function CatalogCard({ el }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setErrors({});
        setIsSuccess(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаем ошибку при изменении поля
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
            
            // Имитация отправки данных на сервер
            setTimeout(() => {
                console.log('Отправленные данные:', {
                    product: el.name,
                    productId: el.id,
                    ...formData
                });
                
                setIsSubmitting(false);
                setIsSuccess(true);
                
                // Очищаем форму через 3 секунды после успешной отправки
                setTimeout(() => {
                    setFormData({ name: '', phone: '' });
                    setIsSuccess(false);
                }, 3000);
            }, 1500);
        }
    }

    return (
        <>
            <div className="bike-card">
                <div className={`sold-out-label ${el.buying ? 'В-наличии' : 'Распродано'}`}>
                    {el.buying ? 'В наличии' : 'Распродано'}
                </div>

                <div className="bike-image-container">
                    <img src={el.image} className="bike-image" alt={el.name} />
                </div>

                <div className="bike-info">
                    <h2 className="bike-model">{el.name}</h2>
                    <p className="bike-price">{el.price}$</p>
                </div>
                <button onClick={handleClick} disabled={!el.buying}>
                    <PiCursorClickBold /> В один клик
                </button>
            </div>

            {isOpen && (
                <div className="bike-card__overlay">
                    <div className="bike-card__details">
                        <div className='bike-card__details-header'>
                            <h3>Заказ в один клик</h3>
                            <button onClick={handleClick}>×</button>
                        </div>
                        <div className='bike-card__details-content'>
                            <div className='bike-card__details-image'>
                                <img src={el.image} alt={el.name} />
                                <h4>{el.name}</h4>
                                
                            </div>
                            <form className='bike-card__details-form' onSubmit={handleSubmit}>
                                <h4>Укажите ваше имя и телефон, и наш менеджер свяжется с вами для оформления заказа.</h4>
                                
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
                                
                                <h4>Нажимая на кнопку «Заказать» я даю своё согласие на обработку персональных данных и принимаю условия соглашения</h4>
                                
                                <button 
                                    type="submit" 
                                    className='color-button'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Отправка...' : 'Заказать'}
                                </button>
                                
                                {isSuccess && (
                                    <div className="success-message">
                                        Спасибо! Ваш заказ принят. Мы свяжемся с вами в ближайшее время.
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

export default CatalogCard