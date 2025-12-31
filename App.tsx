// =============================================================================
// App.tsx - Componente Principal de Estudio Yoga & Bienestar
// =============================================================================
// Descripción: Aplicación web completa para un estudio de yoga con sistema de
// reservas, gestión de clases, terapias, alquileres y un panel de administración.
// 
// Rutas Públicas:
// - /               : Página de inicio
// - /clases         : Lista de clases de yoga
// - /clases/:id     : Detalle de una clase
// - /horarios       : Horario semanal de clases
// - /terapias       : Lista de terapias disponibles
// - /terapias/:id   : Detalle de una terapia
// - /alquiler       : Información de alquiler de salas
// - /resenas        : Testimonios de clientes
// - /contacto       : Formulario de contacto
// - /legal/:type    : Páginas legales (privacidad, términos, cookies)
// 
// Rutas de Admin (protegidas):
// - /admin/login     : Inicio de sesión
// - /admin/dashboard : Panel principal
// - /admin/clases    : Gestión de clases
// - /admin/profesores: Gestión de profesores
// - /admin/horarios  : Gestión de horarios
// - /admin/terapias  : Gestión de terapias
// - /admin/alquiler  : Gestión de espacios
// - /admin/resenas   : Gestión de reseñas
// - /admin/legal     : Gestión de contenido legal
// - /admin/reservas  : Gestión de reservas
// =============================================================================

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

// Componentes de layout
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Páginas públicas
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

// Páginas de administración
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

/**
 * Componente auxiliar para hacer scroll al inicio al cambiar de ruta
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

/**
 * Layout para páginas públicas
 * Incluye header, footer y botón de WhatsApp
 */
const PublicLayout: React.FC = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />  {/* Aquí se renderizan las páginas hijas */}
        </main>
        <Footer />
        <WhatsAppButton />  {/* Botón flotante de contacto */}
    </div>
);

/**
 * Componente para proteger rutas de administración
 * Redirige al login si el usuario no está autenticado
 */
const ProtectedRoute: React.FC = () => {
    const { state } = useAppContext();
    return state.isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

/**
 * Componente de rutas de la aplicación
 * Define la estructura de navegación completa
 */
const AppRoutes: React.FC = () => (
    <Routes>
        {/* ============================================ */}
        {/* RUTAS PÚBLICAS */}
        {/* ============================================ */}
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />                    {/* Inicio */}
            <Route path="clases" element={<ClassesPage />} />         {/* Lista de clases */}
            <Route path="clases/:id" element={<ClassDetailPage />} /> {/* Detalle de clase */}
            <Route path="horarios" element={<SchedulePage />} />      {/* Horarios */}
            <Route path="terapias" element={<TherapiesPage />} />     {/* Lista de terapias */}
            <Route path="terapias/:id" element={<TherapyDetailPage />} /> {/* Detalle terapia */}
            <Route path="alquiler" element={<RentalsPage />} />       {/* Alquiler de salas */}
            <Route path="resenas" element={<ReviewsPage />} />        {/* Testimonios */}
            <Route path="contacto" element={<ContactPage />} />       {/* Contacto */}
            <Route path="legal/:type" element={<LegalPage />} />      {/* Páginas legales */}
        </Route>

        {/* ============================================ */}
        {/* RUTAS DE ADMINISTRACIÓN */}
        {/* ============================================ */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />     {/* Panel principal */}
            <Route path="clases" element={<ManageClasses />} />         {/* Gestión clases */}
            <Route path="profesores" element={<ManageTeachers />} />    {/* Gestión profesores */}
            <Route path="horarios" element={<ManageSchedule />} />      {/* Gestión horarios */}
            <Route path="terapias" element={<ManageTherapies />} />     {/* Gestión terapias */}
            <Route path="alquiler" element={<ManageRentals />} />       {/* Gestión espacios */}
            <Route path="resenas" element={<ManageReviews />} />        {/* Gestión reseñas */}
            <Route path="legal" element={<ManageLegal />} />            {/* Gestión legal */}
            <Route path="reservas" element={<ManageBookings />} />      {/* Gestión reservas */}
        </Route>

        {/* Ruta catch-all: Redirige rutas no encontradas al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

/**
 * Componente principal de la aplicación
 */
const App: React.FC = () => {
    return (
        // AppProvider: Proporciona el estado global a toda la aplicación
        <AppProvider>
            <HashRouter>
                <ScrollToTop />   {/* Componente para scroll automático */}
                <AppRoutes />     {/* Sistema de rutas */}
            </HashRouter>
        </AppProvider>
    );
};

export default App;
