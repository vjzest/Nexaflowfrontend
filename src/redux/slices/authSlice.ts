import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

interface AuthState {
    user: any | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isCheckingAuth: true, // True because we check on app mount
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: any, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await api.post('/auth/logout');
    return null;
});

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await api.put('/auth/profile', userData);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update failed');
        }
    }
);

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Not authenticated');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(getMe.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(getMe.rejected, (state) => {
                state.isCheckingAuth = false;
                state.user = null;
            });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
