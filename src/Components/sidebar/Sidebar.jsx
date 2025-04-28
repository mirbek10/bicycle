import React, { useEffect, useState } from 'react';
import { fetchAccessories, fetchParts, fetchBicycles } from "../../store/apiCalls";
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import "./sidebar.scss";

function Sidebar({ isMenuOpen, toggleMenu }) {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null); 

  const { bicycles, status: bikeStatus } = useSelector(state => state.bike);
  const { accessories, status: accessoriesStatus } = useSelector(state => state.accessories);
  const { parts, status: partsStatus } = useSelector(state => state.parts);

  useEffect(() => {
    dispatch(fetchBicycles());
    dispatch(fetchAccessories());
    dispatch(fetchParts());
  }, [dispatch]);

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  if (bikeStatus === 'loading' || accessoriesStatus === 'loading' || partsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={isMenuOpen ? "sidebar-menu open" : "sidebar-menu"}>
    <div className="sidebar-header">
      <IoClose className="close-icon" onClick={toggleMenu} />
    </div>

      <ul className="sidebar-list">
        <li>
          <h3 onClick={() => toggleCategory('bikes')}>Velo Category</h3>
          <ul className={activeCategory === 'bikes' ? 'active' : ''}>
            {bicycles.length > 0 ? bicycles.map((bike) => (
              <li key={bike.id}>{bike.name}</li>
            )) : <li>No bicycles available</li>}
          </ul>
        </li>

        <li>
          <h3 onClick={() => toggleCategory('accessories')}>Accessories</h3>
          <ul className={activeCategory === 'accessories' ? 'active' : ''}>
            {accessories.length > 0 ? accessories.map((accessory) => (
              <li key={accessory.id}>{accessory.name}</li>
            )) : <li>No accessories available</li>}
          </ul>
        </li>

        <li>
          <h3 onClick={() => toggleCategory('parts')}>Parts</h3>
          <ul className={activeCategory === 'parts' ? 'active' : ''}>
            {parts.length > 0 ? parts.map((part) => (
              <li key={part.id}>{part.name}</li>
            )) : <li>No parts available</li>}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;



