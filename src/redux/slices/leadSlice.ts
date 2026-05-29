import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient() as any;

interface Lead {
    id: string;
    _id?: string;
    name: string;
    email?: string;
    phone: string;
    source: string;
    status: string;
    aiScore?: number;
    aiSummary?: string;
    createdAt: string;
}

interface LeadState {
    leads: Lead[];
    isLoading: boolean;
    error: string | null;
}

const initialState: LeadState = {
    leads: [],
    isLoading: false,
    error: null,
};

export const fetchLeads = createAsyncThunk('leads/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from('leads').select('*');
        if (error) throw error;
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to fetch leads');
    }
});

export const updateLeadStatus = createAsyncThunk('leads/updateStatus', async ({ id, status }: { id: string, status: string }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single();
        if (error) throw error;
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || 'Failed to update lead');
    }
});

const leadSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leads = action.payload || [];
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateLeadStatus.fulfilled, (state, action) => {
                const index = state.leads.findIndex(l => l.id === action.payload.id || l._id === action.payload.id);
                if (index !== -1) {
                    state.leads[index] = action.payload;
                }
            });
    },
});

export default leadSlice.reducer;
