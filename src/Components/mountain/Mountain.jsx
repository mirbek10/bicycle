import React from "react";
import mountainPng from "../../assets/image/mountain.png"
import detail from "../../assets/svg/set.svg"
import detail2 from "../../assets/svg/comp.svg"
import detail3 from "../../assets/svg/detail.svg"
import detail4 from "../../assets/svg/bicycle.svg"
import "./mountain.scss";

const Mountain = () => {
  return (
    <section className="mountain">
        <div className="mountain-title container">
        <h2>ГОРНЫЕ <br />
         ВЕЛОСИПЕДЫ</h2>
        </div>
        <div className="mountain-container container">
      <div className="mountain-content">
        <div className="mountain-cards">
          <div className="card">
            <div className="card-content">
            <h3>Рама</h3>
            <img src={detail4} alt="Рама" className="card-icon" />
            </div>
            <p>It is a long established fact that a reader will be distracted by the readable content of</p>
          </div>
          <div className="card">
            <div className="card-content">
            <h3>Бортовой компьютер</h3>
            <img src={detail2} alt="Бортовой компьютер" className="card-icon" />
            </div>
            <p>The point of using lorem ipsum is that it has a more-or-less normal distribution of letters</p>
          </div>
          <div className="card">
            <div className="card-content">
            <h3>Трансмиссия</h3>
            <img src={detail} alt="Трансмиссия" className="card-icon" />
            </div>
            <p>Many desktop publishing packages and web page editors now use lorem ipsum as</p>
          </div>
          <div className="card">
            <div className="card-content">
            <h3>Оборудование</h3>
            <img src={detail3} alt="Оборудование" className="card-icon" />
            </div>
            <p>Contrary to popular belief, lorem ipsum is not simply random text. It has roots in</p>
          </div>
        </div>
      </div>
      <div className="mountain-image">
        <img src={mountainPng} alt="Горный велосипед" />
        <p>
          Горный велосипед несмотря на свое название часто и активно используются в условиях города,
          так как обладает рядом характеристик, позволяющих сделать велопрогулку максимально приятной
          и комфортной
        </p>
        <button className="mountain-button">Каталог</button>
      </div>
        </div>
    </section>
  );
};

export default Mountain;
