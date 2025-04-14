import { configureStore } from "@reduxjs/toolkit";
import bikeReducer from './bikeSlice.js';
import accessoriesReducer from './accessoriesSlice.js';
import partsReducer from './partsSlice.js';
import EquipmentReducer from './Equipmentslice/EquipmentSLice.js';
import CardReducer from './cart/CartSlise.js'
import bikeStationReducer from './BikeStation/bikeStation.js'
import productReducer from "./product/productSlice"

import authReducer from "./authSlice.js"
const myStore = configureStore({
  reducer: {
    bike: bikeReducer,
    accessories: accessoriesReducer,
    parts: partsReducer,
    equipment: EquipmentReducer,
    cart:CardReducer,
    auth: authReducer,
    bikeStation: bikeStationReducer, 
    product:productReducer,
  },
});

export default myStore;
