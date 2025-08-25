// import {
//   createSlice,
//   createAsyncThunk,
//   createSelector,
// } from '@reduxjs/toolkit';
// const selectAuth = (state) => state.auth;
// import { login as loginAPI } from '../../api/authAPI';
// import httpClient from '../../api/http-clients';
// import { fetchUser } from '../user/userSlice';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { dispatch, rejectWithValue }) => {
//     try {
//       const data = await loginAPI({ email, password });
//       const token = data.data.token;

//       // Store token for subsequent requests
//       localStorage.setItem('authToken', token);

//       // Fetch user immediately after login
//       await dispatch(fetchUser());

//       return { token };
//     } catch (error) {
//       const message =
//         error.response?.data?.message || 'Invalid email or password';
//       return rejectWithValue(message);
//     }
//   }
// );

// // Restore session on app load
// export const restoreSession = createAsyncThunk(
//   'auth/restoreSession',
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return rejectWithValue('No token found');

//     try {
//       const response = await httpClient.get('/users/get-user');
//       return { user: response.data.user };
//       // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       return rejectWithValue('Session expired or invalid');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.removeItem('authToken');
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   // Async thunks and extra reducers
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem('authToken', action.payload.token);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(restoreSession.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(restoreSession.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = localStorage.getItem('authToken');
//       })
//       .addCase(restoreSession.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//         localStorage.removeItem('authToken');
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;

// export const getUserName = createSelector(
//   [selectAuth],
//   (auth) => auth.user?.firstName
// );

// export const getUserFullName = createSelector([selectAuth], (auth) =>
//   `${auth.user?.firstName || ''} ${auth.user?.lastName || ''}`.trim()
// );

// export const getUserIsAuthenticated = createSelector(
//   [selectAuth],
//   (auth) => auth.isAuthenticated
// );

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { login as loginAPI } from '../../api/authAPI';
import httpClient from '../../api/http-clients';
import { fetchUser } from '../user/userSlice'; // user slice handles user state
import { clearCart } from '../cart/cartSlice';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Login and fetch user immediately
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const data = await loginAPI({ email, password });
      const token = data.data.token;

      localStorage.setItem('authToken', token);

      // Populate userSlice
      await dispatch(fetchUser());

      return { token };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      return rejectWithValue(message);
    }
  }
);

// Restore session on app load
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    if (!token) return rejectWithValue('No token found');

    try {
      // Call user API directly or via userSlice
      await dispatch(fetchUser()); // sets user in userSlice
      return { token };
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
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
        localStorage.removeItem('authToken');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

export const performLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart());
};

// Selectors
export const selectAuth = (state) => state.auth;

export const getUserIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);
