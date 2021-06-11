import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { dataSlice } from './slices/data.slice';


export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        data: dataSlice.reducer,
    }
});