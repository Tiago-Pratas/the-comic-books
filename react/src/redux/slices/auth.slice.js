import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.services';


export const registerAsync = createAsyncThunk('auth/register', async (data) => {
    return await AuthService.register(data);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        hasUser: null,
        error: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            if (action.payload.response.status != 500) {
                console.log(action.payload.response.status);
                state.user = action.payload;
                state.hasUser = true;
                state.error = '';
            } else {
                console.log(action.payload.response.data);
                state.hasUser = false;
                state.error = action.payload.response.data;
            }
        });
    },
});