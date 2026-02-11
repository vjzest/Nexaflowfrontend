import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Lead {
    _id: string;
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
        const response = await api.get('/leads');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch leads');
    }
});

export const updateLeadStatus = createAsyncThunk('leads/updateStatus', async ({ id, status }: { id: string, status: string }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/leads/${id}`, { status });
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Failed to update lead');
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
                state.leads = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateLeadStatus.fulfilled, (state, action) => {
                const index = state.leads.findIndex(l => l._id === action.payload._id);
                if (index !== -1) {
                    state.leads[index] = action.payload;
                }
            });
    },
});

export default leadSlice.reducer;
