// components/ProductList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleShowAll } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import './ProductList.scss';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, showAll, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const visibleItems = showAll ? items : items.slice(0, 6);

  return (
    <>
      <div className="product-list">
        {status === 'loading' && <p>Загрузка...</p>}
        {status === 'succeeded' &&
          visibleItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="content">
                <div className="date">24.01.2023</div>
                <h3>{item.name}</h3>
                <Link to={`/product/${item.id}`}>Подробнее</Link>
              </div>
            </div>
          ))}
      </div>

      {status === 'succeeded' && items.length > 6 && (
        <div className="button-wrapper">
          <button onClick={() => dispatch(toggleShowAll())}>
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
