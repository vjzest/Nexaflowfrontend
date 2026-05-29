import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient() as any;

// Websites Slice
export const fetchWebsites = createAsyncThunk('websites/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from('websites').select('*');
        if (error) throw error;
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to fetch websites');
    }
});

export const addWebsite = createAsyncThunk('websites/add', async (data: { name: string, url: string }, { rejectWithValue }) => {
    try {
        const { data: newWebsite, error } = await supabase.from('websites').insert([data]).select().single();
        if (error) throw error;
        return newWebsite;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to add website');
    }
});

export const deleteWebsite = createAsyncThunk('websites/delete', async (id: string, { rejectWithValue }) => {
    try {
        const { error } = await supabase.from('websites').delete().eq('id', id);
        if (error) throw error;
        return id;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to delete website');
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
                state.items = action.payload || [];
                state.isLoading = false;
            })
            .addCase(addWebsite.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteWebsite.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload && item._id !== action.payload);
            });
    }
});

// Logs Slice
export const fetchLogs = createAsyncThunk('logs/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from('logs').select('*');
        if (error) throw error;
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to fetch logs');
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
                state.items = action.payload || [];
                state.isLoading = false;
            });
    }
});

export const websiteReducer = websiteSlice.reducer;
export const logReducer = logSlice.reducer;
