
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

import { HomePage } from './pages/public/HomePage';
import { ClassesPage } from './pages/public/ClassesPage';
import { SchedulePage } from './pages/public/SchedulePage';
import { TherapiesPage } from './pages/public/TherapiesPage';
import { RentalsPage } from './pages/public/RentalsPage';
import { ReviewsPage } from './pages/public/ReviewsPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPage } from './pages/public/LegalPage';
import { ClassDetailPage } from './pages/public/ClassDetailPage';
import { TherapyDetailPage } from './pages/public/TherapyDetailPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageClasses } from './pages/admin/ManageClasses';
import { ManageTeachers } from './pages/admin/ManageTeachers';
import { ManageSchedule } from './pages/admin/ManageSchedule';
import { ManageTherapies } from './pages/admin/ManageTherapies';
import { ManageRentals } from './pages/admin/ManageRentals';
import { ManageReviews } from './pages/admin/ManageReviews';
import { ManageLegal } from './pages/admin/ManageLegal';
import { ManageBookings } from './pages/admin/ManageBookings';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// Wrapper for public-facing pages
const PublicLayout: React.FC = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
    </div>
);

// Wrapper for protected admin routes
const ProtectedRoute: React.FC = () => {
    const { state } = useAppContext();
    return state.isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const AppRoutes: React.FC = () => (
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="clases" element={<ClassesPage />} />
            <Route path="clases/:id" element={<ClassDetailPage />} />
            <Route path="horarios" element={<SchedulePage />} />
            <Route path="terapias" element={<TherapiesPage />} />
            <Route path="terapias/:id" element={<TherapyDetailPage />} />
            <Route path="alquiler" element={<RentalsPage />} />
            <Route path="resenas" element={<ReviewsPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="legal/:type" element={<LegalPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clases" element={<ManageClasses />} />
            <Route path="profesores" element={<ManageTeachers />} />
            <Route path="horarios" element={<ManageSchedule />} />
            <Route path="terapias" element={<ManageTherapies />} />
            <Route path="alquiler" element={<ManageRentals />} />
            <Route path="resenas" element={<ManageReviews />} />
            <Route path="legal" element={<ManageLegal />} />
            <Route path="reservas" element={<ManageBookings />} />
        </Route>
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);


const App: React.FC = () => {
  return (
    <AppProvider>
        <HashRouter>
            <ScrollToTop />
            <AppRoutes />
        </HashRouter>
    </AppProvider>
  );
};

export default App;
