import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient() as any;

export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, { rejectWithValue }) => {
    try {
        // Assume get_admin_stats is an RPC function we'll create in Supabase
        const { data, error } = await supabase.rpc('get_admin_stats');
        if (error) {
            console.warn("RPC failed, falling back to empty stats");
            return { totalUsers: 0, totalLeads: 0, revenue: 0 };
        }
        return data || { totalUsers: 0, totalLeads: 0, revenue: 0 };
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to fetch admin stats');
    }
});

export const fetchAllUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to fetch users');
    }
});

export const updateUserPlan = createAsyncThunk('admin/updatePlan', async (data: { userId: string, plan: string }, { rejectWithValue }) => {
    try {
        const { data: user, error } = await supabase.from('users').update({ plan: data.plan }).eq('id', data.userId).select().single();
        if (error) throw error;
        return user;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to update plan');
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
                state.stats = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload || [];
            })
            .addCase(updateUserPlan.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u.id === action.payload.id || u._id === action.payload.id);
                if (index !== -1) state.users[index] = action.payload;
            });
    }
});

export default adminSlice.reducer;
