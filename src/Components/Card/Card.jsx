import React from 'react';
import './Card.scss';
import { FaCartArrowDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/CartSlise';
import { toast } from 'react-toastify';

function Card({ el }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(el));
        toast.success(`${el.name} добавлен в корзину!`);
    };

    return (
        <div className="product-card">
            <div className={`product-card__badge ${el.buying ? 'product-card__badge--available' : 'product-card__badge--sold'}`}>
                {el.buying ? 'В наличии' : 'Распродано'}
            </div>

            <div className="product-card__image-wrapper">
                <img src={el.image} alt={el.name} className="product-card__image" />
            </div>

            <div className="product-card__info">
                <h2 className="product-card__title">{el.name}</h2>
                <p className="product-card__price">{el.price}$</p>
            </div>

            <button className="product-card__button" onClick={handleAddToCart}>
                <FaCartArrowDown /> В корзину
            </button>
        </div>
    );
}

export default Card;
