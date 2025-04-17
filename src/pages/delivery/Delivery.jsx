import React from 'react'
import { Link } from 'react-router-dom'
import headimg from '../../assets/image/NurislamImg/DeliveryIMG.png'
import {DeliveryInfo} from '../../shared/data/DeliveryInfo'
import { PaymentInfo } from '../../shared/data/PaymentInfo'
import FaqList from '../../Components/FaqList/FaqList'
import "./delivery.scss"
function Delivery() {
  return (
    <div className='delivery'>
      <div className="delivery-head">
        <img src={headimg} alt="" />
        <div className='delivery-head-text container'>
          <div className="head-text">
          <Link to='/' className='home-link'>Главная /</Link><p>Доставка и оплата</p>
          </div>
          <h1>Доставка и оплата</h1>
        </div>
      </div>
      <div className="delivery-content container">
        <div className="delivery-info">
            <h1>ИНФОРМАЦИЯ О ДОСТАВКЕ</h1>
            <div className="delivery-info-text">
                <p>Для удобства покупателей действует несколько способов доставки товаров. Существует доставка по Москве и М.О., доставка по регионам России и самовывоз. Любой из способов доступен при оформление заказа через сайт или у операторов.</p>
                <p>Велосипеды и вело-станки доставляются в собранном и настроенном виде.</p>
                <p>На любые вопросы по правилам и стоимости доставки ответят оператор:  <span style={{ color: "orange" }}>+996 550 011 478</span></p>
            </div>

        </div>
        <div className="delivery-faq">
            <FaqList data={DeliveryInfo}/>
        </div>
      </div>
      <div className="payment-content container">
        <div className="payment-info">
            <h1>ИНФОРМАЦИЯ ОБ ОПЛАТЕ</h1>
                <p>Для удобства покупателей, действует несколько способов отплаты. Ниже, вы можете ознакомится с подробностями и выбрать наиболее подходящий. Любой из способов доступен при оформление заказа через корзину или операторов.</p>
        </div>
        <div className="delivery-faq">
            <FaqList data={PaymentInfo}/>
        </div>
      </div>
    </div>
  )
}

export default Delivery
