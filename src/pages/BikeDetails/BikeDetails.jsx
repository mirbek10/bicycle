import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DetailBike.scss';
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa"; // Добавлена заполненная иконка
import { addToCart } from '../../store/cart/CartSlise';
import { toast } from 'react-toastify';
import BikeSpecs from './BikeSpecs/BikeSpecs';
import DeliveryOptions from './Delivery/DeliveryOptions';
import { addToWishList, removeFromWishList, selectWishListItems } from '../../store/WishListSlice/WishListSlice'

const DetailBike = () => {
    const wishListItems = useSelector(selectWishListItems);
    const { currentDetail } = useSelector((state) => state.detail);
    const dispatch = useDispatch();

    const isInWishList = currentDetail ? wishListItems.some(item => item.id === currentDetail.id) : false;
    
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const sizes = ['S', 'M-L', 'M', 'L', 'XL'];
    const colors = ['#f6ff00', '#00ff80', '#ff9900', '#ff9966', '#993300', '#ff3333'];

    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
    const [highlightStylecolor, setHighlightStylecolor] = useState({ left: 0, width: 0 });

    const handleSizeClick = (size, e) => {
        setSelectedSize(size);
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
        setHighlightStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
        });
    };

    const handleSizeClickcolor = (color, e) => {
        setSelectedColor(color);
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
        setHighlightStylecolor({
            left: rect.left - parentRect.left - 3,
            width: rect.width + 6,
        });
    };

    const allPrice = currentDetail ? currentDetail.price + 600 : 0;
    const allPriceWithDiscount = Math.round(allPrice).toFixed(0);

    const handleAddToCart = () => {
        if (!currentDetail) return;
        dispatch(addToCart({
            ...currentDetail,
            selectedSize,
            selectedColor
        }));
        toast.success(`${currentDetail.name} добавлен в корзину!`);
    };

    const handleWishListClick = () => {
        if (!currentDetail) return;
        
        if (isInWishList) {
            dispatch(removeFromWishList(currentDetail.id));
            toast.info(`${currentDetail.name} удален из избранного`);
        } else {
            dispatch(addToWishList(currentDetail));
            toast.success(`${currentDetail.name} добавлен в избранное`);
        }
    };

    if (!currentDetail) {
        return (
            <div className="detail-bike">
                <p className="no-item">Велосипед не выбран</p>
            </div>
        );
    }

    return (
        <div className="detail-bike">
            <div className="current-detail">
                <div className="current-detail-card">
                    <img src={currentDetail.image} alt={currentDetail.name} />

                    <div className="detail-card">
                        <h3>{currentDetail.name}</h3>
                        <p style={currentDetail.byuing ? {}:{color:"red"}} className={`availability `}>{currentDetail.byuing ? 'В наличии': 'Распродоно'}</p>

                        <div className="price">
                            <span className="current">{currentDetail.price} ₽</span>
                            <span className="old">{allPriceWithDiscount} ₽</span>
                        </div>

                        <p>{currentDetail.description}</p>

                        <div className="sizes">
                            <p>Размер:</p>
                            <div className="size-options">
                                <div className="highlight" style={highlightStyle}></div>
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={(e) => handleSizeClick(size, e)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="colors">
                            <p>Цвет:</p>
                            <div className="color-options">
                                <div className="highlightcolor" style={highlightStylecolor}></div>
                                {colors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={(e) => handleSizeClickcolor(color, e)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="actions">
                            <button 
                                onClick={handleAddToCart} 
                                className="cart-btn color-button"
                                disabled={!selectedSize || !selectedColor}
                            >
                                В корзину
                            </button>
                            <button 
                                onClick={handleWishListClick} 
                                className={`fav-btn ${isInWishList ? 'active' : ''}`}
                            >
                                {isInWishList ? <FaHeart color="#ff7300" /> : <FiHeart />}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <BikeSpecs bike={currentDetail}/>
                    <DeliveryOptions/>
                </div>
            </div>
        </div>
    );
};

export default DetailBike;