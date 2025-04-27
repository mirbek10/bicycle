import { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import '@google/model-viewer';
import BikeSpecs from './BikeSpecs/BikeSpecs';
import DeliveryOptions from './Delivery/DeliveryOptions';
import BikeLoader from '../../shared/loader/BikeLoader';
import { addToCart } from '../../store/cart/CartSlise';
import { addToWishList, removeFromWishList, selectWishListItems } from '../../store/WishListSlice/WishListSlice';
import './DetailBike.scss';

const DetailBike = () => {
    const [is3DViewOn, setIs3DViewOn] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
    const [highlightStylecolor, setHighlightStylecolor] = useState({ left: 0, width: 0 });

    const wishListItems = useSelector(selectWishListItems);
    const { currentDetail, loading, error } = useSelector((state) => state.detail);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const sizes = useMemo(() => ['S', 'M-L', 'M', 'L', 'XL'], []);
    const colors = useMemo(() => ['#f6ff00', '#00ff80', '#ff9900', '#ff9966', '#993300', '#ff3333'], []);

    const isInWishList = useMemo(
        () => currentDetail ? wishListItems.some(item => item.id === currentDetail.id) : false,
        [currentDetail, wishListItems]
    );

    const allPrice = useMemo(
        () => currentDetail ? Math.round(currentDetail.price + 600).toFixed(0) : 0,
        [currentDetail]
    );

    const handleSizeClick = useCallback((size, e) => {
        setSelectedSize(size);
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
        setHighlightStyle({
            left: rect.left - parentRect.left,
            width: rect.width,
        });
    }, []);

    const handleSizeClickcolor = useCallback((color, e) => {
        setSelectedColor(color);
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
        setHighlightStylecolor({
            left: rect.left - parentRect.left - 3,
            width: rect.width + 6,
        });
    }, []);

    const handleAddToCart = useCallback(() => {
        if (!currentDetail) return;
        
        dispatch(addToCart({
            ...currentDetail,
            selectedSize,
            selectedColor
        }));
        toast.success(`${currentDetail.name} добавлен в корзину!`);
    }, [currentDetail, dispatch, selectedColor, selectedSize]);

    const handleWishListClick = useCallback(() => {
        if (!isAuth) {
            toast.warning('Для добавления в избранное необходимо авторизоваться');
            return;
        }
        if (!currentDetail) return;

        if (isInWishList) {
            dispatch(removeFromWishList(currentDetail.id));
            toast.info(`${currentDetail.name} удален из избранного`);
        } else {
            dispatch(addToWishList(currentDetail));
            toast.success(`${currentDetail.name} добавлен в избранное`);
        }
    }, [currentDetail, dispatch, isAuth, isInWishList]);

    const toggle3DView = useCallback(() => {
        setIs3DViewOn(prev => !prev);
    }, []);

    if (!currentDetail) {
        return (
            <div className="detail-bike">
                <p className="no-item">Велосипед не выбран</p>
            </div>
        );
    }

    if (loading) {
        return <BikeLoader />;
    }

    if (error) {
        return (
            <div className="detail-bike">
                <p>Ошибка загрузки данных: {error}</p>
            </div>
        );
    }

    return (
        <div className="detail-bike">
            <div className="current-detail">
                <div className="current-detail-card">
                    <img 
                        src={currentDetail.image} 
                        alt={currentDetail.name} 
                        loading="lazy"
                    />

                    <div className="detail-card">
                        <h3>{currentDetail.name}</h3>
                        <p 
                            className={`availability ${!currentDetail.buying ? 'out-of-stock' : ''}`}
                        >
                            {currentDetail.buying ? 'В наличии' : 'Распродоно'}
                        </p>

                        <div className="price">
                            <span className="current">{currentDetail.price} ₽</span>
                            <span className="old">{allPrice} ₽</span>
                        </div>

                        <p>{currentDetail.description}</p>

                        <div className="sizes">
                            <p>Размер:</p>
                            <div className="size-options">
                                <div className="highlight" style={highlightStyle} />
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={(e) => handleSizeClick(size, e)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="colors">
                            <p>Цвет:</p>
                            <div className="color-options">
                                <div className="highlightcolor" style={highlightStylecolor} />
                                {colors.map((color, index) => (
                                    <button
                                        key={`${color}-${index}`}
                                        className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={(e) => handleSizeClickcolor(color, e)}
                                        aria-label={`Color ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="actions">
                            <button
                                onClick={handleAddToCart}
                                className="cart-btn color-button"
                                disabled={!selectedSize || !currentDetail.buying}
                            >
                                В корзину
                            </button>
                            <button
                                onClick={handleWishListClick}
                                className={`fav-btn ${isInWishList ? 'active' : ''}`}
                                aria-label={isInWishList ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                {isInWishList ? <FaHeart color="#ff7300" /> : <FiHeart />}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <BikeSpecs bike={currentDetail} />
                    <div className="extra-actions">
                        <button 
                            onClick={toggle3DView} 
                            className="view3d-btn"
                            aria-expanded={is3DViewOn}
                        >
                            {is3DViewOn ? 'Скрыть 3D' : 'Смотреть в 3D'}
                        </button>
                    </div>
                    
                    {is3DViewOn && (
                        <motion.div
                            className="bike-3d-container"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <model-viewer
                                src="/src/pages/BikeDetails/3d/bike.glb"
                                alt="3D модель велосипеда"
                                auto-rotate
                                camera-controls
                                ar
                                style={{ 
                                    width: '100%', 
                                    height: '500px', 
                                    borderRadius: '10px', 
                                    overflow: 'hidden' 
                                }}
                            />
                        </motion.div>
                    )}
                    <DeliveryOptions />
                </div>
            </div>
        </div>
    );
};

export default DetailBike;