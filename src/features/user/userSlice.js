import { getUser } from '../../api/user-api';
import httpClient from '../../api/http-clients';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No auth token found');
      }

      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const { data } = await getUser();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.status = 'succeeded';
      state.error = null;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
    setDebtProfileVerification: (state, action) => {
      if (state.data) {
        state.data.debt_profile_verification = action.payload;
      }
    },
    setResidentialAddress: (state, action) => {
      if (state.data) {
        state.data.residentialAddress = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setUser,
  updateLatestDeliveryAddress,
  addDeliveryAddress,
  setError,
  clearUser,
  setSelectedDeliveryAddress,
  setDebtProfileVerification,
  setResidentialAddress,
} = userSlice.actions;

export default userSlice.reducer;

export const getUserFullName = (state) => {
  const user = state.user.data;
  if (!user) return 'Guest';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Guest';
};

export const getUserFirstName = (state) =>
  state.user.data?.firstName || 'Guest';

export const isUserDebtProfileVerified = (state) =>
  Boolean(state.user.data?.bvn);
