import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart
} from "../../store/cart/CartSlise"; // путь подкорректируй под себя
import "./Cart.scss";
import { Link } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = items.length * 99;
    let finalPrice = totalPrice - discount;
    let roundedPrice = finalPrice.toFixed(2);
    let number = Math.floor(Math.random() * 1000000) + 1; // Генерация случайного номера заказа

    return (
        <div className="cart-container">
            <h1 className="cart-title">КОРЗИНА</h1>
            <div className="cart-header">
                <Link to="/" className="cart-back">Вернуться к покупкам</Link>
                <button
                    className="cart-clear"
                    onClick={() => dispatch(clearCart())}
                >
                    Очистить корзину
                </button>
            </div>

            {items.length === 0 ? (
                <p className="cart-empty">Корзина пуста</p>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="image-container">
                                <img src={item.image} alt={item.name} className="cart-item-image" />

                                </div>
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.name}</p>
                                    <div className="cart-quantity">
                                        <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                                    </div>
                                    <p className="cart-item-price">{(item.price * item.quantity).toFixed(2)} $</p>
                                    <button
                                        className="cart-remove"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >×</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <p>Номер заказа: <span>{number}</span></p>
                        <p>Сумма заказа (без скидки): <span>{totalPrice.toFixed(2)} $</span></p>
                        <p>Скидка: <span>{discount} $</span></p>
                        <h2>Итого: <span>{roundedPrice} $</span></h2>
                        <button className="cart-checkout color-button">Оформить заказ</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Cart;
