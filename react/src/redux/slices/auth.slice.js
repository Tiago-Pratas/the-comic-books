import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.services';

export const authAsyncThunks = {
    registerAsync: createAsyncThunk('user/register', async (form) => {
        return await AuthService.register(form);
    }),
    
};

export const authSlice = createSlice({
    name: 'auth',
    intialState: {
        user: null,
        hasUser: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authAsyncThunks.register.fullfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.hasUser = true;
                state.error = '';
            } else {
                state.hasUser = false;
                state.error = action.payload;
            }
        });
    },
});