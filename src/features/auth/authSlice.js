import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
const selectAuth = (state) => state.auth;
import { login as loginAPI } from '../../api/authAPI';
import httpClient from '../../api/http-clients';

const initialState = {
  userId: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginAPI({ email, password });

      localStorage.setItem('authToken', data.token);

      return {
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      return rejectWithValue(message);
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await httpClient.get('/users/get-user');
      return { user: response.data.user };
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return rejectWithValue('Session expired or invalid');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken');
      });
  },
});

export const { logout, clearError, setUserId } = authSlice.actions;
export default authSlice.reducer;

// export const getUserName = (state) => state.auth.user?.username;

export const getUserName = createSelector(
  [selectAuth],
  (auth) => auth.user?.firstName
);
// export const getUserFullName = (state) => state.auth.user?.fullName;
// export const getUserIsAuthenticated = (state) => state.auth.isAuthenticated;

export const getUserFullName = createSelector([selectAuth], (auth) =>
  `${auth.user?.firstName || ''} ${auth.user?.lastName || ''}`.trim()
);

export const getUserIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);
