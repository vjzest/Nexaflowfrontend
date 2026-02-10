import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

// Websites Slice
export const fetchWebsites = createAsyncThunk('websites/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/websites');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch websites');
    }
});

export const addWebsite = createAsyncThunk('websites/add', async (data: { name: string, url: string }, { rejectWithValue }) => {
    try {
        const response = await api.post('/websites', data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to add website');
    }
});

export const deleteWebsite = createAsyncThunk('websites/delete', async (id: string, { rejectWithValue }) => {
    try {
        await api.delete(`/websites/${id}`);
        return id;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to delete website');
    }
});

const websiteSlice = createSlice({
    name: 'websites',
    initialState: { items: [], isLoading: false } as { items: any[], isLoading: boolean },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWebsites.pending, (state) => { state.isLoading = true; })
            .addCase(fetchWebsites.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(addWebsite.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteWebsite.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    }
});

// Logs Slice
export const fetchLogs = createAsyncThunk('logs/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/logs');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch logs');
    }
});

const logSlice = createSlice({
    name: 'logs',
    initialState: { items: [], isLoading: false } as { items: any[], isLoading: boolean },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.pending, (state) => { state.isLoading = true; })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            });
    }
});

export const websiteReducer = websiteSlice.reducer;
export const logReducer = logSlice.reducer;
