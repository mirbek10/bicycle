import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../store/product/productSlice';
import './ProductDetail.scss';
import BikeLoader from '../../shared/loader/BikeLoader';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (status === 'loading') return <BikeLoader/>
  if (!selectedProduct) return <p>Продукт не найден.</p>;

  const {
    image, title, text, date, category, views, likes,
    advertisement, advertisementImage,
    describe, describeImage,
    description, descriptionImage,
    information1, information1Image,
    newsTitle, news, newsImage,
    fastTitle, fastNews, fastNewsImage,
    technologyTitle, technologyDetail, technologyImage,
    aboutTitle, sizepart, aboutImage
  } = selectedProduct;

  const renderSection = (title, content, image, isMain = false) => (
    <div className={`section ${isMain ? 'main-section' : ''}`}>
      {title && <h2>{title}</h2>}
      <div className="section-content">
        {image && <img src={image} alt={title || 'section image'} className="section-image" />}
        {content && <p>{content}</p>}
      </div>
    </div>
  );

  return (
    <div className="product-detail">
      <img className="main-image" src={image} alt={title} />
      <h1>{title}</h1>
      <p><strong>Дата:</strong> {date}</p>
      <p><strong>Категория:</strong> {category}</p>
      <p><strong>Текст:</strong> {text}</p>
      <p><strong>Просмотры:</strong> {views}</p>
      <p><strong>Лайки:</strong> {likes}</p>
      <hr />

      {renderSection(advertisement, describe, advertisementImage, true)} {/* Главная секция */}
      {renderSection(null, description, descriptionImage)}
      {renderSection(null, information1, information1Image)}
      {renderSection(newsTitle, news, newsImage)}
      {renderSection(fastTitle, fastNews, fastNewsImage)}
      {renderSection(technologyTitle, technologyDetail, technologyImage)}
      {renderSection(aboutTitle, sizepart, aboutImage)}
    </div>
  );
};

export default ProductDetail;
