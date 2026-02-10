import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/admin/stats');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch admin stats');
    }
});

export const fetchAllUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/admin/users');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
});

export const updateUserPlan = createAsyncThunk('admin/updatePlan', async (data: { userId: string, plan: string }, { rejectWithValue }) => {
    try {
        const response = await api.put('/admin/users/plan', data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to update plan');
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: null,
        users: [],
        isLoading: false,
        error: null
    } as { stats: any, users: any[], isLoading: boolean, error: string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminStats.pending, (state) => { state.isLoading = true; })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.stats = action.payload.stats;
                state.isLoading = false;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUserPlan.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) state.users[index] = action.payload;
            });
    }
});

export default adminSlice.reducer;
