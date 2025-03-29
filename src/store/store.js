import { configureStore } from "@reduxjs/toolkit";
import bikeReducer from './bikeSlice.js';
import accessoriesReducer from './accessoriesSlice.js';
import partsReducer from './partsSlice.js';

const myStore = configureStore({
    reducer: {
        bike: bikeReducer,
        accessories: accessoriesReducer,
        parts: partsReducer,
      }, 
    
})

export default myStore;