// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
// import ResetPassword from '../pages/ResetPassword';  // Uncomment if you have the reset password page
import DashboardPage from '../pages/dashboard';
import DashboardLayout from '../layouts/dashboard-layout';
import ProtectedRoute from '../components/ProtectedRoute';
import ProfilePage from '../pages/test-page';
import TestPage from '../pages/protected/sample-page';
import VerifyOtpPage from '../pages/VerifyLoginOtpPage';
import SuperAdminProtectedRoutes from '../components/SuperAdminProtectedRoute';
import SuperAdminDashboard from '../pages/super-admin-pages/SuperAdminDashboard';
import GeneralDashboard from '../pages/protected/general-pages/GeneralDashboard';
import ResetPasswordPage from '../pages/request-reset-password';
import RequestResetPasswordPage from '../pages/request-reset-password';
import VerifyLoginOtpPage from '../pages/VerifyLoginOtpPage';
import VerifyResetPasswordOtpPage from '../pages/VerifyResetOtpPage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible without authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-login-otp" element={<VerifyLoginOtpPage/>} />
        <Route path="/request-password-reset-otp" element={<RequestResetPasswordPage/>} />
        <Route path="/verify-password-reset-otp" element={<VerifyResetPasswordOtpPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Uncomment the following line if ResetPassword page is implemented */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Private Route: Protects access to the Dashboard, requires authentication */}
        <Route
          path="/"
          element={
             <SuperAdminProtectedRoutes />
          }
        >
          <Route index element={<GeneralDashboard/>} />
          <Route path="/loan" element={<ProfilePage />} />
          <Route path="users" element={<TestPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;