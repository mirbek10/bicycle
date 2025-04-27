import React from "react";
import "./contacts.scss";
import phone from "../../assets/svg/orangeP.svg"
import day from "../../assets/svg/day.svg"
import email from "../../assets/svg/emailO.svg"
import locale from "../../assets/svg/localeO.svg"

const Contacts = () => {
  return (
    <section className="contacts">
      <h1 className="contacts-title container">КОНТАКТЫ</h1>
      <div className="contacts-content">
        <div className="map-content">
          <iframe
            className="map"
            title="Bishkek Map"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7120.221850199678!2d74.58019671435099!3d42.88388528486551!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1743502545480!5m2!1sru!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

        <div className="contact-info container">
          <div className="info-item">
            <img src={phone} alt="" />
            <p>+996 550 01 14 78 <br />
              +996 xxx xx xx xx
            </p>
          </div>
          <div className="info-item">
            <img src={locale} alt="" />
            <p>Бишкек, ул. Турусбекова, 109/1</p>
          </div>
          <div className="info-item">
            <img src={email} alt="" />
            <p>bicycles.kg@gmial.com</p>
          </div>
          <div className="info-item">
            <img src={day} alt="" />
            <p>Без выходных <br />
              10:00 - 20:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

