import React from 'react'
import { Link } from 'react-router-dom'
import "./grant.scss"
import grantIMG from "../../assets/image/NurislamImg/grantImage.png"
import grantIF from "../../assets/image/NurislamImg/grantIf.png"
import { GuaranteesBrand } from '../../shared/data/grantBrand'
import BikeBrands from '../../Components/BikeBrand/Bikebrands'

function Grant() {
  return (
    <div className='grant'>
      <div className="grant-head">
        <img src={grantIMG} alt="" />
        <div className='grant-head-text container'>
          <div className="head-text">
          <Link to='/' className='home-link'>Главная /</Link><p>Гарантии</p>
          </div>
          <h1>Гарантии</h1>
        </div>
      </div>
      <div className="grant-2 container">
        <p>Одной из важных составляющих работы нашего интернет-магазина является то, что продаваемые товары сертифицированы и обеспечены фирменной гарантией фирм-производителей.</p>
        <p>Также, для удобства покупателей, наш магазин помогает (участвует) в формирование гарантийных запросов по всем нижеперечисленным брендам. При любом гарантийном случае можно обращаться напрямую к нам.</p>
      </div>
      <div className="grant-brands container">
        {
            GuaranteesBrand.map((item) =>(
                <div className="grant-card">
                    <h3>{item.brand}</h3>
                    <h4>{item.guarantees}</h4>
                </div>
            ))
        }
      </div>
      <div className="grant-4 container">
        <h1>Для осуществления гарантийного обслуживания необходимы:</h1>
        <div className="grant-4-text">
            <p>правильно и без помарок и исправлений заполненный гарантийный талон, в котором должны быть указаны модель и серийный номер изделия, дата продажи и печать торгующей организации;</p>
            <p>документ, подтверждающий покупку (товарная накладная);</p>
            <p>полная комплектация товара</p>

        </div>
        <div className="grant-4-end">
            <p>Обращаем также ваше внимание на то, что при получении и оплате заказа покупатель в присутствии курьера обязан проверить комплектацию и внешний вид изделия на предмет отсутствия физических дефектов (царапин, трещин, сколов и т.п.) и полноту комплектации. После отъезда курьера претензии по этим вопросам не принимаются.</p>
        </div>
      </div>
      <div className="grant-if container">
        <h1>Гарантийное обслуживание производится, если:</h1>
        <div className="grant-if-content">
            <div className="grant-if-left">
                <div className="grant-if-con">
                <ul>
                    <li>утерян или не заполнен гарантийный талон</li>
                    <li>оборудование было поставлено на территорию РФ неофициально</li>
                    <li>изделие имеет следы механического повреждения или вскрытия</li>
                    <li>нарушены заводские пломбы</li>
                    <li>были нарушены условия эксплуатации, транспортировки или хранения</li>
                    <li>проводился ремонт лицами, не являющимися сотрудниками авторизованного сервисного центра</li>
                    <li>использовались неоригинальные комплектующие</li>
                </ul>
                </div>
                <div className="grant-if-des">
                    <p>Подробное описание условий предоставления гарантии вы можете найти в документации к приобретённому товару и/или на сайте соответствующего производителя.</p>
                </div>
            </div>
            <img src={grantIF} alt="" className="grant-if-img" />
        </div>
      </div>
      <BikeBrands/>
    </div>
  )
}

export default Grant
