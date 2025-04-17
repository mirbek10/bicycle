import React from 'react'
import { Link } from 'react-router-dom'
import workshopIMG from '../../assets/image/NurislamImg/workShopIMG.png'
import "./workshop.scss"
import FaqList from '../../Components/FaqList/FaqList';
import {serviceData} from "../../shared/data/serviceData"
import {worksShop} from "../../shared/data/serviceData"

  

function Workshop() {
  return (
    <div className='workshop'>
        <div className="workshop-head">
        <img src={workshopIMG} alt="" />
        <div className='workshop-head-text container'>
          <div className="head-text">
          <Link to='/' className='home-link'>Главная /</Link><p>Веломастерская</p>
          </div>
          <h1>Веломастерская</h1>
        </div>
      </div>
      <div className="workshop-1">
        <div className="workshop-content container">
        <div className="workshop-text">
            <p>Если вы купили велосипед в нашем магазине, то то можете не волноваться о настройке и проверке, так как мы это выполняем в рамках предпродажной подготовки. Но если вы откатались уже сезон и ваш железный конь уже выглядит и ведёт себя потрёпанно, мы с удовольствием приведём его в порядок. Наша веломастерская работает ежедневно и выполняет не только периодическое обслуживание, но и ремонт велосипеда любой сложности</p>
        </div>
        <div className="workshop-text">
            <p>Отличное оснащение и опытные специалисты обеспечат максимально короткий срок ремонта. Какой бы ни была поломка, наличие большого количества узлов и деталей на складе позволит быстро вернуть технике работоспособность. Мы берём в работу горные модели, шоссейные и городские велосипеды</p>
            <p>Являясь профессиональными велосипедистами, мастера нашей компании быстро и чётко выявят неисправность и предложат максимально эффективный способ ремонта. Очень скоро ваш байк будет вновь на ходу</p>
        </div>

        </div>
      </div>
      <div className="workshop-prices container">
        <h1>Стоимость Основных услуг</h1>
        <div className="workshop-cards">
            {
                worksShop.map((item) => (
                    <div className="workshop-card">
                <h4>{item.work}</h4>
                <h3>{item.priceWork}</h3>
            </div>
                ))
            }
        </div>

      </div>
      <div className="dop-uslugi">
        <h1 className='container'>Дополнительные услуги</h1>
        <FaqList data={serviceData}/>
      </div>
    </div>
  )
}

export default Workshop
