// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

// Define interfaces for clarity and type safety
interface IProfile {
  fullName: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicUrl: string;
  isVerified: boolean | null;
}

interface IContact {
  email: string;
  phoneNumber: string;
  address: string
}

interface IKyc {
  isKycCompleted: boolean;
}

export interface IUser {
  profile: IProfile;
  contact: IContact;
  kyc: IKyc;
  ads: string[];
  isSeller: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  emailVerificationExpires: string;
  isDisable: boolean | null;
  isBanned: boolean | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;

  resetPasswordOtpExpires: string;
  id: string;
  businessDetails?: {
    name: string
    address: string
    phoneNumber: string
    regNumber: string
    certificate: string
    isVerified: boolean
    storeName?: string;
    rating?: number;
    totalSales?: number;
  }
}

export interface IUserData {
  userProfile: {
    profile: IProfile;
    contact: IContact;
    kyc: IKyc;
    ads: string[];
    isSeller: boolean | null;
    isEmailVerified: boolean | null;
    isPhoneVerified: boolean | null;
    emailVerificationExpires: string;
    isDisable: boolean;
    isBanned: boolean;
    isActive: boolean;
    rating: number | null;
    totalSales: number | null;
    createdAt: string;
    updatedAt: string;
    resetPasswordOtpExpires: string;
    id: string;
  };
  userLocation: {
    lat: number | null;
    lon: number | null
  } | null
}

// Initial state
const initialState: IUserData = {
  userProfile: {
    profile: {
      fullName: '',
      firstName: '',
      lastName: '',
      bio: '',
      profilePicUrl: '',

      isVerified: null,
    },
    contact: {
      email: '',
      phoneNumber: '',
      address: '',
    },
    kyc: {
      isKycCompleted: false,
    },
    ads: [],
    isSeller: false,
    isEmailVerified: false,
    isPhoneVerified: false,
    emailVerificationExpires: '',
    isDisable: false,
    isBanned: false,
    isActive: false,
    rating: null,
    totalSales: null,
    createdAt: '',
    updatedAt: '',
    resetPasswordOtpExpires: '',
    id: '',
  },
  userLocation: {
    lat: null,
    lon: null
  }
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      console.log({ dispatched: action.payload })
      state.userProfile = action.payload;
    },
    setUserLocation: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.userLocation = action.payload;
    },
    logout: (state) => {
      // Reset the state to initial on logout
      state.userProfile = initialState.userProfile;
      localStorage.removeItem('token');
    },
  },
});

// Actions
export const { setUserData, setUserLocation, logout } = authSlice.actions;

// Selector
export const selectUserProfile = (state: RootState) => state.auth.userProfile;

// Reducer
export default authSlice.reducer;
