import { configureStore } from "@reduxjs/toolkit";
import bikeReducer from './bikeSlice.js';
import accessoriesReducer from './accessoriesSlice.js';
import partsReducer from './partsSlice.js';
import EquipmentReducer from './Equipmentslice/EquipmentSLice.js';

const myStore = configureStore({
  reducer: {
    bike: bikeReducer,
    accessories: accessoriesReducer,
    parts: partsReducer,
    equipment: EquipmentReducer,
  },
});

export default myStore;
