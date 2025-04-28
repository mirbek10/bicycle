import React, { useState, useEffect } from 'react';
import './BikeSpecs.scss';

const BikeSpecs = ({ bike }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isBicycle = bike.category === 'bicycle';
  const baseSpecs = {
    "Цвет": bike.color,
    "Страна": bike.country || "Неизвестно",
    "Гарантия": "2 года"
  };

  const bicycleSpecs = {
    "Год": "2023",
    "Диаметр колеса": "29\"",
    "Материал рамы": "Карбон",
    "Размер": "M (18\")",
    "Производитель": "Scott",
    "Покрышки": "SCHWALDE ROCKET RON EVO / 2.1 127EPI KEVLAT Bead Tubeless Easy / PaceStar compound",
    "Рама": "Scale Carbon / HMX-технология / технология IMP / Коническая рулевая труба / BB92 / Технология SDS / Дропауты IDS SL",
    "Подседельный Штырь": "Ritchey WCS 700 Series: Carbon Link FlexLogic / 31.6mm 900 Series: Carbon 2B SDS / 34.9mm",
    "Седло": "Ritchey WCS Stream V3 Titanium rails",
    "Вилка": "Rock Shox SID RL3 Air / демпфер DNA3 3-режима / 15mm QR axle / коническая рулевая труба / Удалённая блокировка, регулировка отскока / ход 100mm",
    "Вынос": "Ritchey WCS C~260 700 Series: +6° / 900 Series: -6° / 31.8mm / 1 1/8°",
    "Колеса": "Syncros XR RC",
    "Руль": "Ritchey Carbon WCS / 9° / 720mm / грипсы с замком",
    "Тип тормозов": "Дисковый гидравлический",
    "Тормозная система": "Shimano XTR M9000 Disc 180/F and 160/Rmm SM-RT81 IceTech CL диски",
    "Манетки": "SRAM XXI Trigger",
    "Система шатунов": "SRAM XXI GXP PF DM Carbon crankarm / QF 156 700 Series: 34T / 900 Series: 32T",
    "Задний переключатель": "SRAM XXI",
    "Цепь": "SRAM PC-XX1",
    "Количество скоростей": "11"
  };

  const specs = isBicycle ? { ...baseSpecs, ...bicycleSpecs } : baseSpecs;

  return (
    <div className="bike-specs-container">
      <div className="specs-grid">
        {Object.entries(specs).map(([key, value]) => (
          <React.Fragment key={key}>
            <div className='flex-box'>
              <div className="spec-key">{key}</div>
              <div className="spec-value">{value}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="last-updated">
        Последнее обновление: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default BikeSpecs;