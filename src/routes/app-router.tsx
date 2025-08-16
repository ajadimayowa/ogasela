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
import GeneralDashboard from '../pages/protected/general-pages/GeneralDashboard';
import ResetPasswordPage from '../pages/request-reset-password';
import RequestResetPasswordPage from '../pages/request-reset-password';
import VerifyLoginOtpPage from '../pages/VerifyLoginOtpPage';
import VerifyResetPasswordOtpPage from '../pages/VerifyResetOtpPage';
import SuperAdminLoanDashboard from '../pages/protected/super-admin-pages/loan-pages/SuperAdminLoanDashboard';
import CreateStaffPage from '../pages/protected/super-admin-pages/CreateStaffPage';
import SuperAdminSettingsPage from '../pages/protected/super-admin-pages/SuperAdminSettingsPage';
import SuperAdminManageBranchPage from '../pages/protected/super-admin-pages/SuperAdminManageBranchPage';
import SuperAdminManageStaffsPage from '../pages/protected/super-admin-pages/SuperAdminManageStaffsPage';
import SuperAdminDuplicateCheckerPage from '../pages/protected/super-admin-pages/SuperAdminDuplicateCheckerPage';
import OwnerPage from '../pages/owner-page';
import RootAdminProtectedRoute from '../components/RootAdminProtectedRoute';
import RootLoginPage from '../pages/root-login';
import RootAdminDashboard from '../pages/protected/general-pages/RootAdminDashboard';
import RootAdminOrganizationListPage from '../pages/protected/root-admin-pages/RootAdminOrganizationListPage';
import CreateDeptPage from '../pages/protected/super-admin-pages/CreateDeptPage';
import CreateRolePage from '../pages/protected/super-admin-pages/CreateRolePage';
import CreateBranchPage from '../pages/protected/super-admin-pages/CreateBranchPage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible without authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/root-login" element={<RootLoginPage/>} />
        <Route path="/creator" element={<OwnerPage/>} />
        <Route path="/verify-login-otp" element={<VerifyLoginOtpPage/>} />
        <Route path="/request-password-reset-otp" element={<RequestResetPasswordPage/>} />
        <Route path="/verify-password-reset-otp" element={<VerifyResetPasswordOtpPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Uncomment the following line if ResetPassword page is implemented */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Private Route: Protects access to the Dashboard, requires authentication */}
        <Route
          path="/super-admin"
          element={
             <SuperAdminProtectedRoutes />
          }
        >
          <Route index path='dashboard' element={<GeneralDashboard/>} />
          <Route path="create-branch" element={<CreateBranchPage/>} />
          <Route path="branch-management" element={<SuperAdminManageBranchPage/>} />

          <Route path="create-staff" element={<CreateStaffPage/>} />
          <Route path="create-dept" element={<CreateDeptPage/>} />
          <Route path="create-role" element={<CreateRolePage/>} />

          <Route path="hr" element={<SuperAdminManageStaffsPage/>} />
          <Route path="duplicate-checker" element={< SuperAdminDuplicateCheckerPage/>} />
          <Route path="settings" element={<SuperAdminSettingsPage/>} />
          
          <Route path="loan" element={<SuperAdminLoanDashboard/>}>
          {/* <Route path=''/> */}
            
          </Route>
          <Route path="users" element={<TestPage />} />
        </Route>

        {/* Private Route: Protects access to the Dashboard, requires authentication */}
        <Route
          path="/root-admin"
          element={
             <RootAdminProtectedRoute />
          }
        >
          <Route path="dashboard" index element={<RootAdminDashboard/>} />
          <Route path="organizations" element={<RootAdminOrganizationListPage/>} />
          <Route path="audit-trail" element={<SuperAdminManageBranchPage/>} />
          <Route path="settings" element={<CreateStaffPage/>} />
          <Route path="hr" element={<SuperAdminManageStaffsPage/>} />
          <Route path="duplicate-checker" element={< SuperAdminDuplicateCheckerPage/>} />
          <Route path="settings" element={<SuperAdminSettingsPage/>} />
          
          <Route path="loan" element={<SuperAdminLoanDashboard/>}>
          {/* <Route path=''/> */}
            
          </Route>
          <Route path="users" element={<TestPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;