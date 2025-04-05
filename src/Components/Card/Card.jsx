import React,{useState} from 'react';
import './Card.scss';
import { FaCartArrowDown } from "react-icons/fa";
import { addToCart } from '../../store/cart/CartSlise';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


function Card({el}) {
    const dispatch = useDispatch();

    const CartAdd = () => {
        dispatch(addToCart(el));
        toast.success(`${el.name} добавлен в корзину!`);
    };


    return (
        <div className="bike-card">
            <div className={`sold-out-label ${el.buying === true ? 'В-наличии': 'Распродано'}`}>
                {el.buying === true ? 'В наличии': 'Распродано'}
            </div>

            <div className="bike-image-container">
                <img src={el.image} alt="" className="bike-image" />
            </div>

            <div className="bike-info">
                <h2 className="bike-model">{el.name}</h2>
                <p className="bike-price">{el.price}$</p>
            </div>
                <button onClick={CartAdd}><FaCartArrowDown/>В карзину</button>
        </div>
    );
}

export default Card;