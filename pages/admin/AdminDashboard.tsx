
import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { UsersIcon, CalendarIcon, ClipboardListIcon, HeartHandshakeIcon, BuildingIcon, MessageCircleIcon, BookUserIcon } from '../../components/icons';

const StatCard = ({ title, value, icon, to }: { title: string; value: number; icon: React.ReactNode; to: string }) => (
    <Link to={to} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="bg-brand-violet/20 text-brand-violet p-3 rounded-full">
            {icon}
        </div>
    </Link>
);


export const AdminDashboard: React.FC = () => {
    const { state } = useAppContext();

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatCard title="Clases" value={state.classes.length} icon={<ClipboardListIcon className="h-8 w-8" />} to="/admin/clases" />
                <StatCard title="Profesores" value={state.teachers.length} icon={<UsersIcon className="h-8 w-8" />} to="/admin/profesores" />
                <StatCard title="Horarios" value={state.schedule.length} icon={<CalendarIcon className="h-8 w-8" />} to="/admin/horarios" />
                <StatCard title="Terapias" value={state.therapies.length} icon={<HeartHandshakeIcon className="h-8 w-8" />} to="/admin/terapias" />
                <StatCard title="Salas en Alquiler" value={state.rentals.length} icon={<BuildingIcon className="h-8 w-8" />} to="/admin/alquiler" />
                <StatCard title="Reseñas" value={state.reviews.length} icon={<MessageCircleIcon className="h-8 w-8" />} to="/admin/resenas" />
                <StatCard title="Reservas" value={state.bookings.length} icon={<BookUserIcon className="h-8 w-8" />} to="/admin/reservas" />
            </div>
        </AdminLayout>
    );
};