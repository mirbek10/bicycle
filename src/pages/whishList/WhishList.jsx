import React from 'react';
import Card from '../../Components/Card/Card';
import { useSelector, useDispatch } from "react-redux";
import { 
  selectWishListItems, 
  removeFromWishList,
  clearWishList,
  moveToCart
} from "../../store/WishListSlice/WishListSlice";
import { addToCart } from "../../store/cart/CartSlise";
import './WhishList.scss'; 
import { EmptyFavorites } from './EmptyFavorites/EmptyFavorites';

function WhishList() {
    const wishListItems = useSelector(selectWishListItems);
    const dispatch = useDispatch();
  
    const handleMoveToCart = (productId) => {
      const product = dispatch(moveToCart(productId));
      if (product) {
        dispatch(addToCart({
          ...product,
          quantity: 1 
        }));
      }
    };

    return (
        <div className="whishlist-container">
            <div className="whishlist-header">
                <h2>Список желаний</h2>
                {wishListItems.length > 0 && (
                    <button 
                        className="clear-all-btn"
                        onClick={() => dispatch(clearWishList())}
                    >
                        Очистить список
                    </button>
                )}
            </div>

            {wishListItems.length === 0 ? (
                <EmptyFavorites/>
            ) : (
                <div className="whishlist-items">
                    {wishListItems.map(item => (
                        <div key={item.id} className="whishlist-item">
                            <Card 
                                el={item} 
                                showFullInfo={true}
                            />
                            
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => dispatch(removeFromWishList(item.id))}
                                >
                                    Удалить
                                </button>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WhishList;   