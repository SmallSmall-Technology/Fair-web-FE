import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
const selectAuth = (state) => state.auth;

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise((res) => setTimeout(res, 1000));

    if (email === 'admin@smallsmall.com' && password === 'admin') {
      return {
        user: { email, username: 'Sade', fullName: 'Sade Brown' },
        token: 'fake-jwt-token',
      };
    } else {
      return rejectWithValue('Invalid credentials');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (token === 'fake-jwt-token') {
            resolve({
              user: {
                email: 'admin@smallsmall.com',
                username: 'Sade',
                fullName: 'Sade Brown',
              },
              token,
            });
          } else {
            reject(new Error('Invalid token'));
          }
        }, 500);
      });
    } catch (error) {
      localStorage.removeItem('authToken');
      return rejectWithValue(error.message || 'Invalid token');
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
        console.log('Login rejected:', action.payload);
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
        console.log('Restore session rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// export const getUserName = (state) => state.auth.user?.username;

export const getUserName = createSelector(
  [selectAuth],
  (auth) => auth.user?.username
);
// export const getUserFullName = (state) => state.auth.user?.fullName;
// export const getUserIsAuthenticated = (state) => state.auth.isAuthenticated;

export const getUserFullName = createSelector(
  [selectAuth],
  (auth) => auth.user?.fullName
);

export const getUserIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);
