import React from 'react'
import { Link } from 'react-router-dom'
import mapBanner from '../../assets/image/NurislamImg/contactBanner.png'
import messageIMG from '../../assets/image/NurislamImg/orangeB.png'
import "./contact.scss"
import BikeBrands from '../../Components/BikeBrand/Bikebrands'
import FaqList from '../../Components/FaqList/FaqList'


function Contact() {
  return (
    <div className='contact-page'>
      <div className="contact-head">
        <img src={mapBanner} alt="" />
        <div className='contact-head-text container'>
          <div className="head-text">
          <Link to='/' className='home-link'>Главная /</Link><p>Контакты</p>
          </div>
          <h1>Контакты</h1>
        </div>
      </div>
      <div className="contact-map">
      <div className="map-content">
      <iframe
      className="map"
  title="Bishkek Map"
  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7120.221850199678!2d74.58019671435099!3d42.88388528486551!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1743502545480!5m2!1sru!2sus"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
      <div className="contact-map-content">
        <div className='contactM-part'>
          <div className="contactM-block">
            <h3>Адрес магазина:</h3>
            <p>Россия, Москва, ул. Доватора, дом 7/8 с1</p>
          </div>
          <div className="contactM-block">
            <h3>График работы:</h3>
            <p>Понедельник — Воскресение с 10:00 до 20:00 часа</p>
            <p>БЕЗ ВЫХОДНЫХ</p>
          </div>
          <div className="contactM-block">
            <h3>Телефоны:</h3>
            <p>+7 (495) 055-75-86</p>
            <p>+7 (965) 142-22-99</p>
          </div>
          <div className="contactM-block">
            <h3>E-mail:</h3>
            <p>order@world-bike.ru — заказы</p>
            <p>nfo@world-bike.ru — информация</p>
            <p>opt@world-bike.ru — опт</p>
          </div>
        </div>
        <div className='contactM-part2'>
          <h3>Юридическая информация:</h3>
          <div className="contactM-block2">
            <p>Наименование: </p>
            <h3>ИП НЕТРЕБИН ВЛАДИСЛАВ ВЯЧЕСЛАВОВИЧ</h3>
          </div>
          <div className="contactM-block2">
            <p>ИНН: </p>
            <h3>402573939444</h3>
          </div>
          <div className="contactM-block2">
            <p>ОГРН: </p>
            <h3>317402700004683</h3>
          </div>
          <div className="contactM-block2">
            <p>Фактический адрес: </p>
            <h3>Москва, ул. Доватора, дом 7/8 с1</h3>
          </div>
          <div className="contactM-block2">
            <p>Юридический адрес: </p>
            <h3>Москва, ул. Доватора, дом 7/8 с1</h3>
          </div>
          <div className="contactM-block2">
            <p>Расчетный счет: </p>
            <h3>40802810800000085888</h3>
          </div>
          <div className="contactM-block2">
            <p>Банк: </p>
            <h3>АО «ТИНЬКОФФ БАНК»</h3>
          </div>
          <div className="contactM-block2">
            <p>Корр.счет: </p>
            <h3>30101810145250000974 </h3>
          </div>
          <div className="contactM-block2">
            <p>БИК: </p>
            <h3>044525974</h3>
          </div>

        </div>
      </div>
      </div>
      <div className="contact-message">
        <div className="message-left container">
          <h1>СВЯЖИТЕСЬ С НАМИ ПО ЛЮБЫМ ВОПРОСАМ</h1>
          <form className='message-form'>
            <div className="message-row">
              <input type="text" placeholder='Имя'/>
              <input type="email" placeholder='E-mail'/>
            </div>
            <div className="message-row">
              <input type="tel" placeholder='Телефон'/>
              <input type="text" placeholder='Компания'/>
            </div>
            <input type="text" placeholder='Сообщение' />
          </form>
          <button>Задать вопрос</button>
        </div>
        <div className="message-right">
            <img src={messageIMG} alt="" />
        </div>
      </div>
      <div className="contact-vopros">
        <h1 className='vapros container'>Часто задаваемые вопросы:</h1>
        <FaqList/>
      </div>
      <BikeBrands/>
    </div>
  )
}

export default Contact


