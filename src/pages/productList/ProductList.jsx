import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, toggleShowAll } from '../features/products/productsSlice';
import { fetchProducts,toggleShowAll } from '../../store/product/productSlice';
import { Link } from 'react-router-dom';
import './ProductList.scss';
import { FcLike } from "react-icons/fc";
import { FaUsersViewfinder } from "react-icons/fa6";


import BikeLoader from '../../shared/loader/BikeLoader';


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

        {status === 'loading' && <BikeLoader/>}

        {status === 'succeeded' &&
          visibleItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="content">
                <div className="date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <h6>{item.category}</h6>
                <div className='icon'>
                <h5>views:{item.views}</h5>
                <h5>likes:{item.likes}</h5>
                </div>
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
