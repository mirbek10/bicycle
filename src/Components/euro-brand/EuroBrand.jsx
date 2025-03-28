import React from 'react';
import EuropeIcon from "../../assets/svg/EuropeIcon.svg";
import WarrantyIcon from "../../assets/svg/grant.svg";
import SettingsIcon from "../../assets/svg/setting.svg";
import DeliveryIcon from "../../assets/svg/dostavka.svg";
import "./euroBrand.scss"; // Подключаем SCSS стили

const features = [
  {
    icon: EuropeIcon,
    title: "Европейские бренды",
    text: "Представляем десятки европейских брендов"
  },
  {
    icon: WarrantyIcon,
    title: "Вечная гарантия",
    text: "На некоторые бренды предоставляем пожизненную гарантию"
  },
  {
    icon: SettingsIcon,
    title: "Предпродажная настройка",
    text: "Специалисты настроят ваш велосипед наилучшим образом"
  },
  {
    icon: DeliveryIcon,
    title: "Доставка за 24 часа",
    text: "Доставляем товар всеми популярными транспортными компаниями"
  }
];

function EuroBrand({ icon, title, text }) {
  return (
    <div className="feature-card">
        <div className="feature-midle">
      <img src={icon} alt={title} className="feature-icon" />
      <h2 className="feature-title">{title}</h2>
        </div>
      <p className="feature-text">{text}</p>
    </div>
  );
}

function FeaturesList() {
  return (
    <div className="feature-content">
    <div className="feature container">
      {features.map((feature, index) => (
        <EuroBrand 
          key={index}
          icon={feature.icon} 
          title={feature.title} 
          text={feature.text} 
        />
      ))}
    </div>
    </div>
  );
}

export default FeaturesList;



