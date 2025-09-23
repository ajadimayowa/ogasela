// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarketerProtectedRoute from '../components/MarketerProtectedRoute';
import MarketerGeneralDashboard from '../pages/protected/general-pages/MarketerGeneralDashboard';
import CreateLoanPage from '../pages/protected/marketer-pages/CreateLoanPage';
import MarketerLoanDashboardComp from '../pages/protected/marketer-pages/loan-pages/MarketerGeneralDashboard';
import MarketerManageLoansPage from '../pages/protected/marketer-pages/MarketerManageLoansPage';
import MarketerViewGroupPage from '../pages/protected/marketer-pages/loan-pages/MarketerViewGroupPage';
import MarketerViewCustomerPage from '../pages/protected/marketer-pages/loan-pages/MarketerViewCustormerPage';
import MarketerDuplicateCheckerPage from '../pages/protected/marketer-pages/duplicate-pages/MarketerDuplicateCheckerPage';

import HomePage from '../pages/public/HomePage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible without authentication */}
        <Route path="/" element={<HomePage />} />
        {/* Uncomment the following line if ResetPassword page is implemented */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Private Route: Protects access to the Dashboard, requires authentication */}
        

        <Route
          path="/marketer"
          element={
            <MarketerProtectedRoute />
          }
        >
          <Route index path='db' element={<MarketerGeneralDashboard />} />
          <Route path='loan-db' element={<MarketerLoanDashboardComp />} />
          <Route path='loan-management' element={<MarketerManageLoansPage />} />
          <Route path='view-group/:id' element={<MarketerViewGroupPage />} />
          <Route path='view-customer/:id' element={<MarketerViewCustomerPage />} />

          <Route path='create-loan' element={<CreateLoanPage />} />
          <Route path='view-loan' element={<MarketerManageLoansPage />} />

          <Route path="duplicate-checker" element={< MarketerDuplicateCheckerPage />} />
        </Route>


        

        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;