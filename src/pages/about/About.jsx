import React from 'react';
import { Link } from 'react-router-dom';
import about from "../../assets/image/aidanimg/about.png";
import { FaOdnoklassniki, FaVk, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import cycle from "../../assets/image/aidanimg/cycle.png"
import cycle2 from "../../assets/image/aidanimg/cycle2.png"
import cycle3 from "../../assets/image/aidanimg/cycle3.png"
import bike from "../../assets/image/aidanimg/bike.png"
import Contacts from '../../Components/contacts/Contacts';
import BikeBrands from '../../Components/BikeBrand/Bikebrands';
import "./About.scss";

function About() {
  return (
    <div className='about'>
      <div className='about-head'>
        <img src={about} alt="banner" />
        <div className='about-head-text container'>
        <div className="head-text">
                <Link to='/' className='home-link'>Главная /</Link><p>О нас</p>
                </div>
              <h1>О нас</h1>
        </div>
    </div>
      <div className='content'>
        <div className='content-text container'>
          <h1><span>Велосипед</span> – это не просто средство передвижения!</h1>
        </div>

        <div className='content-section container'>
          <div className='content-box'>
            <h5>Хранение</h5>
            <p>Любишь кататься — люби и велосипед в квартире на зиму парковать или сдавай к нам на хранение и обслуживание.</p>
            <a href="#">Подробнее</a>
          </div>

          <div className='content-box1'>
            <h5>Веломастерская</h5>
            <p>Если вы купили велосипед в нашем магазине, то не волнуйтесь о настройке — мы это выполним при предпродажной подготовке.</p>
            <a href="#">Подробнее</a>
          </div>

          <div className='content-box2'>
            <h5>Гарантия</h5>
            <p>Наш магазин помогает в формировании гарантийных запросов по всем брендам. Обращайтесь к нам напрямую.</p>
            <a href="#">Подробнее</a>
          </div>
        </div>
      </div>
      <div className='frame'>
        <div className='des-frame container'>
          <h1>НЕСКОЛЬКО СЛОВ О НАС И НАШЕМ ДЕЛЕ</h1>
          <p>Велосипед — это не просто транспорт. Для нас это жизнь, свобода и приключения.</p>
          <p>Мы любим своё дело и хотим, чтобы вы полюбили велосипед так же сильно.</p>
          <div className='icons'>
            <div className='icon'><h6><FaOdnoklassniki /></h6></div>
            <div className='icon'><h6><FaVk /></h6></div>
            <div className='icon'><h6><FaTelegramPlane /></h6></div>
            <div className='icon'><h6><FaWhatsapp /></h6></div>
            <div className='icon'><h6><FaSquarePhone /></h6></div>
          </div>
        </div>
          <div className='frame-image'>
            <img src={cycle} alt="bike" />
          </div>
      </div>
      <div className='ad'>
        <h1 className='container'>МЫ СОБРАЛИ ДЛЯ ВАС ЛУЧШЕЕ ИЗ ВЕЛОСИПЕДНОГО МИРА</h1>
        <div className='thum container'>
          <h6>World-Bike специализируется на продаже и обслуживании велосипедов, запчастей, аксессуаров и экипировки.</h6>
          <p>У нас только качественные премиальные товары. А под заказ соберём уникальный кастомный велосипед специально для вас.</p>
        </div>
        <img src={cycle2} alt="cycle-promo" />
      </div>
      <div className='slice'>
        <h1 className='container'>Мы — официальные дилеры лучших брендов:</h1>
        <div className='slicer-content'>
          <div className='brands-card'>
            <h5>Велосипеды</h5>
            <ul>
              <li>BMC</li><li>Cervélo</li><li>Cipollini</li><li>Sün</li><li>Early Rider</li><li>Giant</li><li>Look</li><li>Orbea</li><li>Pinarello</li><li>Scott</li><li>Wilier</li><li>Officine Mattio</li>
            </ul>
          </div>
          <div className='brands-card2'>
            <h5>Аксессуары</h5>
            <ul>
              <li>SKS</li><li>Selle Royal</li><li>Elite</li><li>Crank Brothers</li><li>Salomon</li><li>Garmin</li><li>Look</li><li>Wellgo</li><li>Pedros</li><li>Fizik</li><li>Blackburn</li><li>Sigma Sport</li><li>Tacx</li>
            </ul>
          </div>
          <div className='brands-card3'>
            <h5>Запчасти</h5>
            <ul>
              <li>Shimano</li><li>SRAM</li><li>Campagnolo</li><li>FSA</li><li>Ritchey</li><li>Truvativ</li><li>Race Face</li><li>Mavic</li><li>DT Swiss</li><li>Fulcrum</li><li>Continental</li><li>Schwalbe</li><li>Maxxis</li><li>Hutchinson</li><li>Magura</li><li>Hope</li><li>Hayes</li><li>Tektro</li><li>Avid</li><li>TRP</li><li>Jagwire</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='contact'>
        <div className='des-contact container'>
          <h1>Остались вопросы? </h1>
          <p>Позвоните нам по номеру</p>
          <h1>+7 (495) 055-75-86</h1>
          <p>Мы к вашим услугам! И, конечно же, приходите в наш магазин, чтобы посмотреть товары вживую, лично оценить качество и сделать правильный выбор!</p>
        </div>
        <img src={cycle3} alt="" />
      </div>

      <div className='bike-section'>
        <h1>WORLD-BIKE – ЭТО В ПЕРВУЮ ОЧЕРЕДЬ КОМАНДА!</h1>
        <div className='part-section'>
        <div className='bike-left'>
          <p>Все наши сотрудники — это бывшие профессиональные велосипедисты, чемпионы и призёры соревнований Европы и России, участники отечественной сборной. Не сомневайтесь, если кто-то и способен предоставить вам по-настоящему профессиональную консультацию, то это они.</p>
          <h5>Консультанты World-Bike помогут вам в любом вопросе:</h5>
          <ul>
            <li>подбор велосипеда под ваш рост, вес, стиль езды и цели покупки байка;</li>
            <li>помощь в выборе запчастей, аксессуаров и экипировки;</li>
            <li>консультации по любой теме, касающейся спортивной тематики.</li>
          </ul>
        </div>
        <div className='bike-right'>
          <img src={bike} alt="" />
        </div>
        </div>
      </div>

      <div className='gallery'>
        <h1>Фотогалерея</h1>
        <div className='bike-photos'>
          <img src="https://i.pinimg.com/736x/bd/9d/ab/bd9dab479e46612597e79ab5c965325e.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/33/dd/14/33dd1428994edb0e246245bd11520702.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/0d/2f/08/0d2f08700738a919438152e7011aca64.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/2b/ec/8c/2bec8ce5f0d31d5fb19e389a6ac50447.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/85/25/13/8525139dbb4bf89a2ca46dbd676e8fd6.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/92/c6/35/92c6350c748f21013c1e828cb94cc74a.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/21/38/4c/21384c8a87b004d366ff7173445c8e87.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/fb/64/39/fb6439c1327813670312e1a34265f71a.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/2e/14/8f/2e148ff4b34ca0360bcb5905eb775625.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/dc/fc/e0/dcfce0c2755b7afe7ad4db4de748a086.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/38/e1/2a/38e12a06c781f04ba9df5ef063737ab6.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/92/7c/41/927c41a74f6bbdb05cc3f293e65d7768.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/a8/be/b2/a8beb26b6d8ef6ca55e5751b730f8872.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/43/45/d8/4345d8c8d4ebe6376d1ced3c219b7ed8.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/1a/f5/56/1af556f75e80f1bce1119844ca94df59.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/21/f0/21/21f021ce597f40feac81561613e28ce1.jpg" alt="" />
          <img src="https://i.pinimg.com/736x/1b/51/a9/1b51a9bc23a739495bc11efc5cd0af9c.jpg" alt="" />
        </div>
      </div>

      <div className='gallery'>
        <h1>Контакты</h1>
        <div className="map-content">
      <iframe
      className="map"
  title="Bishkek Map"
  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7120.221850199678!2d74.58019671435099!3d42.88388528486551!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1743502545480!5m2!1sru!2sus"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
        
      </div>

      <div className='information'>
        <div className='collab'>
        <div className='address'>
        <div className='inf-box'>
          <h6>Адрес магазина:</h6>
          <p>Россия, Москва, ул. Доватора, дом 7/8 с1</p>
        </div>
        <div className='inf-box'>
          <h6>Телефоны:</h6>
          <p>+996 999 12 24 27</p>
        </div>
        <div className='inf-box'>
          <h6>E-mail:</h6>
          <p>order@world-bike.ru — заказы</p>
          <p>nfo@world-bike.ru — информация</p>
          <p>opt@world-bike.ru — опт</p>
        </div>
        </div>
       
      </div>
      <div className="legal-info">
  <h1>Юридическая информация</h1>
  
  <div className="legal-section">
    
    <ul className="legal-details">
    <li><strong>Наименование:</strong> ИП Нетребин Владислав Вячеславович</li>
      <li><strong>ИНН:</strong> 402573939444</li>
      <li><strong>ОГРН:</strong> 317402700004683</li>
    </ul>
  </div>

  <div className="legal-section">
    <h2>Адреса:</h2>
    <ul className="legal-details">
      <li><strong>Фактический адрес:</strong> Москва, ул. Доватора, дом 7/8 с1</li>
      <li><strong>Юридический адрес:</strong> Москва, ул. Доватора, дом 7/8 с1</li>
    </ul>
  </div>

  <div className="legal-section">
    <h2>Банковские реквизиты:</h2>
    <ul className="legal-details">
      <li><strong>Расчетный счет:</strong> 4080281080000085888</li>
      <li><strong>Банк:</strong> АО «ТИНЬКОФФ БАНК»</li>
      <li><strong>Корр.счет:</strong> 30101810145250000974</li>
      <li><strong>БИК:</strong> 044525974</li>
    </ul>
  </div>
</div>
</div>
<BikeBrands/>
    </div>
  );
}

export default About;
