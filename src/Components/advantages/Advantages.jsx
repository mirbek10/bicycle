import React from "react";
import { Link } from "react-router-dom";
import advan1 from "../../assets/image/NurislamImg/advan1.png"
import advan2 from "../../assets/image/NurislamImg/advan2.png"

import "./advantages.scss";
const advan = [
  {
    title: "БЕСПЛАТНАЯ ДОСТАВКА",
    des: "Мы пользуемся всеми популярными видами доставки",
  },
  {
    title: "ОБМЕН И ВОЗВРАТ",
    des: "Все товары обеспечены фирменной гарантией фирм-производителей",
  },
  {
    title: "ДОП. ОБСЛУЖИВАНИЕ",
    des: "Мы выполняем ремонт велосипеда любой сложности",
  },
  {
    title: "ОНЛАЙН ОПЛАТА",
    des: "Для удобства вы можете оплатить товар банковской картой через сайт",
  },
];

function Advantages() {
  return (
    <div className="advantages">
      <h1 className="advan-title container">Преимущества</h1>
      <div className="advan-content">
        <img src={advan1} alt=""  className="advan1" />
        <div className="advan-blocks">
          {
          advan.map((item, index) => (
            <div className="advan-block" key={index}>
              <h3>{item.title}</h3>
              <p>{item.des}</p>
             <Link className="details"><p>Подробнее</p></Link> 
            </div>
          ))
          }
        </div>
        <img src={advan2} alt="" className="advan2" />
      </div>
    </div>
  );
}

export default Advantages;

