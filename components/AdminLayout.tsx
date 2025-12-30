
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HomeIcon, UsersIcon, CalendarIcon, LogOutIcon, ClipboardListIcon, BuildingIcon, HeartHandshakeIcon, MessageCircleIcon, FileTextIcon, BookUserIcon } from './icons';

const AdminNavItem = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <NavLink to={to} className={({isActive}) => `flex items-center px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700' : ''}`}>
        {icon}
        <span className="ml-3">{children}</span>
    </NavLink>
);


export const AdminLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="h-16 flex items-center justify-center text-2xl font-bold font-serif">
                    <span className="text-white">Admin Panel</span>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <AdminNavItem to="/admin/dashboard" icon={<HomeIcon className="h-5 w-5" />}>Dashboard</AdminNavItem>
                    <AdminNavItem to="/admin/clases" icon={<ClipboardListIcon className="h-5 w-5" />}>Clases</AdminNavItem>
                    <AdminNavItem to="/admin/profesores" icon={<UsersIcon className="h-5 w-5" />}>Profesores</AdminNavItem>
                    <AdminNavItem to="/admin/horarios" icon={<CalendarIcon className="h-5 w-5" />}>Horarios</AdminNavItem>
                    <AdminNavItem to="/admin/terapias" icon={<HeartHandshakeIcon className="h-5 w-5" />}>Terapias</AdminNavItem>
                    <AdminNavItem to="/admin/alquiler" icon={<BuildingIcon className="h-5 w-5" />}>Alquiler de Salas</AdminNavItem>
                    <AdminNavItem to="/admin/resenas" icon={<MessageCircleIcon className="h-5 w-5" />}>Reseñas</AdminNavItem>
                    <AdminNavItem to="/admin/reservas" icon={<BookUserIcon className="h-5 w-5" />}>Reservas</AdminNavItem>
                    <AdminNavItem to="/admin/legal" icon={<FileTextIcon className="h-5 w-5" />}>Textos Legales</AdminNavItem>
                </nav>
                <div className="p-4">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2 text-gray-100 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
                        <LogOutIcon className="h-5 w-5" />
                        <span className="ml-3">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="p-4">
                        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                    </div>
                </header>
                <div className="flex-1 p-6 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};