import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DataServices from '../../services/data.services';

export const searchIssuesAsync = createAsyncThunk('data/searchIssues', async (data) => {
    return await DataServices.searchIssues(data);
});

export const findCollectionAsync = createAsyncThunk('data/findCollection', async (data) => {
    return await DataServices.findCollection(data);
});

export const findWishlistAsync = createAsyncThunk('data/findWishlist', async (data) => {
    return await DataServices.findWishlist(data);
});

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        issues: [],
        collections: [],
        wishlists: [],
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchIssuesAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state.issues = [ ...action.payload, ...state.issues  ];
            } else {
                state.error = action.payload.message.toString();
            }
        });

        builder.addCase(findCollectionAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state.collections = [...action.payload];
            } else {
                state.error = action.payload;
            }
        });

        builder.addCase(findWishlistAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state.wishlists = [...action.payload];
            } else {
                state.error = action.payload;
            }
        });
    }
});