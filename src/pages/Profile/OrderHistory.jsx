import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clearOrders } from '../../store/cart/CartSlise'
import './OrderHistory.scss'

function OrderHistory() {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.cart)
  const [openOrderId, setOpenOrderId] = useState(null)

  const toggleOrder = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId))
  }

  const handleClearHistory = () => {
    dispatch(clearOrders())
    setOpenOrderId(null)
  }

  return (
    <div className="order-history">
      <div className="order-history-header">
        <h2>История заказов</h2>
        {orders.length > 0 && (
          <button className="clear-history-btn" onClick={handleClearHistory}>
            Очистить историю
          </button>
        )}
      </div>

      <div className="order-table-header">
        <div>Дата</div>
        <div>Номер заказа</div>
        <div>Сумма заказа</div>
        <div>Статус</div>
      </div>

      {orders.length === 0 ? (
        <div className="cart-empty">История заказов пуста</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-row">
            <div className="order-info" onClick={() => toggleOrder(order.id)}>
              <div>{order.date}</div>
              <div>{order.id}</div>
              <div>{order.price} ₽</div>
              <div className="status-cell">
                Завершённый заказ
                {openOrderId === order.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {openOrderId === order.id && (
                <motion.div
                  className="order-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p>
                          <strong>{item.price.toLocaleString()} ₽</strong>
                          {item.originalPrice &&
                            item.originalPrice !== item.price && (
                              <span className="original-price">
                                {item.originalPrice.toLocaleString()} ₽
                              </span>
                            )}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory
