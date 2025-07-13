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
import VerifyOtpPage from '../pages/VerifyOtpPage';
import SuperAdminProtectedRoutes from '../components/SuperAdminProtectedRoute';
import SuperAdminDashboard from '../pages/super-admin-pages/SuperAdminDashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible without authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Uncomment the following line if ResetPassword page is implemented */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Private Route: Protects access to the Dashboard, requires authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute />
          }
        >
          {/* Nested routes inside DashboardLayout */}
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<TestPage />} />
          {/* Add additional nested routes here as needed */}
        </Route>

        <Route
          path="/super-admin"
          element={
            <SuperAdminProtectedRoutes />
          }
        >
          {/* Nested routes inside DashboardLayout */}
          <Route index element={<SuperAdminDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<TestPage />} />
          {/* Add additional nested routes here as needed */}
        </Route>

        {/* Catch-all Route: Redirect unknown paths to login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;