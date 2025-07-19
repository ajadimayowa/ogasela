// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistor, RootState } from "../../store/store";

export interface IStaffProfile {
  token: string | null;
  staffProfile: {
    createdAt: string,
    department: string,
    emailIsVerified: boolean | null,
    firstName: string,
    fullName: string,
    homeAddress: string,
    id: string,
    isApproved: boolean | null,
    isCreator: boolean | null,
    isDisabled: boolean | null,
    isPasswordUpdated: boolean | null,
    isSuperAdmin: boolean | null,
    lga: string,
    phoneNumber: string,
    staffKycInformation: {}
    staffLevel: string,
    staffNokInformation: {}
    state: string,
    updatedAt: string
  } | null;
  organisationData: {
    id: string,
    nameOfOrg: string,
    orgEmail: string,
    orgAddress: string,
    orgLga: string,
    orgState: string,
    orgPhoneNumber: string,
    orgSubscriptionPlan: string,
    orgRegNumber: string,
    createdAt: string,
    updatedAt: string,

  } | null


}

const initialState: IStaffProfile = {
  token: localStorage.getItem('token') || null,
  staffProfile: {
    id: '',
    createdAt: '',
    department: '',
    emailIsVerified: null,
    firstName: '',
    fullName: '',
    homeAddress: '',
    isApproved: null,
    isCreator: null,
    isDisabled: null,
    isPasswordUpdated: null,
    isSuperAdmin: null,
    lga: '',
    phoneNumber: '',
    staffKycInformation: {},
    staffLevel: '',
    staffNokInformation: {},
    state: '',
    updatedAt: '',
  },
  organisationData: {
    id: '',
    nameOfOrg: '',
    orgEmail: '',
    orgAddress: '',
    orgLga: '',
    orgState: '',
    orgPhoneNumber: '',
    orgSubscriptionPlan: '',
    orgRegNumber: '',
    createdAt: '',
    updatedAt: '',
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: any) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setStaffProfile: (state, action: PayloadAction<IStaffProfile['staffProfile']>) => {
      state.staffProfile = action.payload;
    },
    setOrganisationData: (state, action: PayloadAction<IStaffProfile['organisationData']>) => {
      state.organisationData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.staffProfile = null; // or {}
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, setStaffProfile, logout } = authSlice.actions;

export default authSlice.reducer;