// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistor, RootState } from "../../store/store";

export interface IStaffProfile {
  token: string | null;
  rootAdminProfile: {
    id: string,
    fullName: string,
    firstName: string,
    email: string,
    phoneNumber: string,
    isRootAdmin: boolean,

  }| null;
  staffProfile: {
    createdAt: string,
    branch:{
      _id:string;
      name:string;
    };
    department: string,
    organization:string,
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
    userClass: string,
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

  } | null;

  departmentData: {
    id: string,
    name: string
  } | null;

  roleData: {
    id: string,
    name: string,
    permissions:string[],
  } | null

}

const initialState: IStaffProfile = {
  token: localStorage.getItem('token') || null,
  rootAdminProfile: {
    id: '',
    fullName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    isRootAdmin: false
  },
  staffProfile: {
    id: '',
    createdAt: '',
    department: '',
    organization:'',
    emailIsVerified: null,
    firstName: '',
    branch:{
      _id:'',
      name:''
    },
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
    userClass:'',
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
  },
  departmentData: {
    id: '',
    name: ''
  },
  roleData: {
    id: '',
    name: '',
    permissions:[]
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
    setRootAdminProfile: (state, action: any) => {
      state.rootAdminProfile = action.payload;
    },
    setStaffProfile: (state, action: PayloadAction<IStaffProfile['staffProfile']>) => {
      state.staffProfile = action.payload;
    },
    setOrganisationData: (state, action: PayloadAction<IStaffProfile['organisationData']>) => {
      state.organisationData = action.payload;
    },
    
    setDeptData: (state, action: PayloadAction<IStaffProfile['departmentData']>) => {
      state.departmentData = action.payload;
    },
    setRoleData: (state, action: PayloadAction<IStaffProfile['roleData']>) => {
      state.roleData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.staffProfile = null; // or {}
       state.rootAdminProfile = null; // or {}
      localStorage.removeItem('token');
    },
  },
});

export const { setToken,setRootAdminProfile, setStaffProfile, setOrganisationData, logout } = authSlice.actions;

export default authSlice.reducer;