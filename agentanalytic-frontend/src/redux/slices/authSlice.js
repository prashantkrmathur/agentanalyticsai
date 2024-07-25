import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/api';

// Thunks for login, signup, and profile fetching
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // Returns the token and user data
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/register', credentials);
    // Automatically log in the user after signup
    const loginResponse = await dispatch(loginUser({
      email: credentials.email,
      password: credentials.password,
    })).unwrap();
    return loginResponse; // Return login response which includes token and user data
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user; // Assuming user data is also returned
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle signup actions
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetch user profile actions
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
