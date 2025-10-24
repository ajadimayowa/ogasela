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
import UserProfilePage from '../pages/dashboard/ProfilePage';
import RouteProtector from '../components/RouteProtector';
import DashboardLayout from '../components/DashboardLayout';
import FavoritesPage from '../pages/dashboard/Favorites';
import PostAdPage from '../pages/dashboard/PostAdPage';
import MessagesPage from '../pages/dashboard/MessagesPage';
import ViewAdPage from '../pages/public/ViewAdInformation';
import NotFound from '../pages/public/NotFound';
import ProductSearchPage from '../pages/public/ProductSearchPage';
import CategoryProductsPage from '../pages/public/CategoryProductsPage';
import MyAds from '../pages/dashboard/MyAds';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible without authentication */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<ProductSearchPage />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/ad/:id' element={<ViewAdPage/>}/>
        <Route path='/category/:categoryId' element={<CategoryProductsPage/>}/>
        
        <Route path="/dashboard" element={<RouteProtector><DashboardLayout /></RouteProtector>}>
        <Route path="favorites" element={<FavoritesPage/>} />
        <Route path="post-ad" element={<PostAdPage/>} />
        <Route path='ads' element={<MyAds/>} />
        <Route path="messages" element={<MessagesPage/>} />
        <Route path="profile" element={<UserProfilePage/>} />

        </Route>
        
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