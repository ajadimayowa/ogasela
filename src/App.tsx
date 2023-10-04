import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import AppContainer from './pages/containers/appcontainer';
import DashContainer from './pages/containers/dashContainer';

import Homepage from './pages';

import LoginPage from './pages/onboarding/login';
import SignupPage from './pages/onboarding/signup';
import ResetPassPage from './pages/onboarding/resetpass';
import OtpPage from './pages/onboarding/otppage';
import SupportPage from './pages/onboarding/support';
import PrivacyPolicyPage from './pages/onboarding/privacypolicy';
import TermsandConPage from './pages/onboarding/termsandcon';
import DashboardPage from './pages/dashboads/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppContainer/>}>
          <Route index element={<Homepage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='reset-pass' element={<ResetPassPage/>}/>
          <Route path='otp' element={<OtpPage/>}/>
          <Route path='support' element={<SupportPage/>}/>
          <Route path='privacy-policy' element={<PrivacyPolicyPage/>}/>
          <Route path='terms-and-conditions' element={<TermsandConPage/>}/>
        </Route>

        <Route path='/dashboard' element={<DashContainer/>}>
          <Route index element={<DashboardPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='reset-pass' element={<ResetPassPage/>}/>
          <Route path='otp' element={<OtpPage/>}/>
          <Route path='support' element={<SupportPage/>}/>
          <Route path='privacy-policy' element={<PrivacyPolicyPage/>}/>
          <Route path='terms-and-conditions' element={<TermsandConPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
