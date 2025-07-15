// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  staffProfile:{
    staffLevel:string,
    organization:{subscriptionType:string}
  } | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  staffProfile: {
    staffLevel:'',
    organization:{
      subscriptionType:'basic'
    }
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action:any) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setStaffProfile: (state, action: any) => {
      state.staffProfile = action?.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken,setStaffProfile, logout } = authSlice.actions;

export default authSlice.reducer;