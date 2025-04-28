import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  checkout
} from "../../store/cart/CartSlise";
import "./Cart.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cartItems.length * 99;
  const finalPrice = Math.max(0, totalPrice - discount);
  const roundedPrice = finalPrice.toFixed(2);

  const generateOrderNumber = () => {
    return `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Ваша корзина пуста!");
      return;
    }
    setOrderNumber(generateOrderNumber());
    setShowModal(true);
  };

  const confirmOrder = () => {
    dispatch(checkout());
    setOrderCompleted(true);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className="cart-container">
      <h1 className="cart-title">КОРЗИНА</h1>

      <div className="cart-header">
        <Link to="/" className="cart-back">← Вернуться к покупкам</Link>
        {cartItems.length > 0 && (
          <button className="cart-clear" onClick={() => dispatch(clearCart())}>
            Очистить корзину
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-container">
          {orderCompleted ? (
            <>
              <p className="cart-success">Заказ №{orderNumber} успешно оформлен!</p>
              <p>Скоро вы будете перенаправлены на страницу заказов...</p>
              <Link to="/profile" className="cart-orders-link">
                Перейти к заказам сейчас
              </Link>
            </>
          ) : (
            <p className="cart-empty">Ваша корзина пуста</p>
          )}
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item-image" 
                    loading="lazy" 
                  />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-quantity">
                    <button 
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))}>
                      +
                    </button>
                  </div>
                  <p className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="cart-remove"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label="Удалить товар"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              <span>Товары ({cartItems.length})</span>
              <span>₽{totalPrice.toFixed(2)}</span>
            </p>
            <p>
              <span>Скидка</span>
              <span className="discount">−₽{discount.toFixed(2)}</span>
            </p>
            <h2>
              <span>Итого</span>
              <span>₽{roundedPrice}</span>
            </h2>

            <button 
              className="cart-checkout color-button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}

<Modal isOpen={showModal} onClose={closeModal}>
  <div className="order-confirmation">
    <h3 className="order-confirmation-title">Подтверждение заказа</h3>

    <div className="order-details">
      <p><strong>Номер заказа:</strong> {orderNumber}</p>
      <p><strong>Сумма к оплате:</strong> ₽{roundedPrice}</p>
      <p>После подтверждения вы получите номер для отслеживания заказа.</p>
    </div>

    <div className="confirmation-actions">
      <button className="confirm-button" onClick={confirmOrder}>
        Подтвердить
      </button>
      <button className="cancel-button" onClick={closeModal}>
        Вернуться к корзине
      </button>
    </div>
  </div>
</Modal>

    </div>
  );
}

export default Cart;
