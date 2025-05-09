import React, { useState } from 'react';
import './faqlist.scss';
import { Link } from 'react-router-dom';

const FaqList = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2 container">
      {data.map((item, index) => (
        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
          <button onClick={() => toggle(index)} className="faq-button">
            {item.title || item.question}
            <span>{openIndex === index ? '▲' : '▼'}</span>
          </button>

          <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
            {item.items ? (
              <ul className="faq-service-list">
                {item.items.map((service, idx) => (
                  <li key={idx} className="flex justify-between border-b py-1">
                    <span>{service.name}</span>
                    <span>{service.price} сом</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{item.answer}</p>
            )}
          </div>
        </div>
      ))}
      <div className="faq-item" >
        <button className="faq-button">
          <Link className='a-href' style={{ textDecoration:"none", color:"#333", fontSize:"18px",}} to='/chat'>
            <span>Если есть вопросы то пишите нам в чат</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FaqList;





