import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.services';


export const registerAsync = createAsyncThunk('auth/register', async (data) => {
    return await AuthService.register(data);
});

export const loginAsync = createAsyncThunk('auth/login', async (data) => {
    return await AuthService.login(data);
});

export const googleLoginAsync = createAsyncThunk('auth/google', async () => {
    return await AuthService.googleLogin();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        hasUser: null,
        error: '',
    },
    reducers: {
        matchPasswords: (state) => {
            state.user = null,
            state.hasUser= false,
            state.error = 'Passwords do not match';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            if (action.payload.response.status != 500) {
                state.user = action.payload;
                state.hasUser = true;
                state.error = '';
            } else {
                state.hasUser = false;
                state.error = action.payload.response.data;
            }
        });

        builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (action.payload.email) {
                state.user = action.payload;
                state.hasUser = true;
                state.error = '';
            } else {
                state.hasUser = false;
                state.error = action.payload;
            }
        });

        builder.addCase(googleLoginAsync.fulfilled, (state, action) => {
            console.log('here', action.payload);
            if (action.payload.response != undefined) {
                state.user = action.payload;
                state.hasUser = true;
                state.error = '';
            } else {
                state.hasUser = false;
                state.error = action.payload.toString();
            }
        });
    },
});

export const { matchPasswords } = authSlice.actions;