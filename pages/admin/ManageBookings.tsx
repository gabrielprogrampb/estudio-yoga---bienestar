
import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';

export const ManageBookings: React.FC = () => {
    const { state } = useAppContext();
    
    const getScheduleDetails = (scheduleId: string) => {
        const entry = state.schedule.find(s => s.id === scheduleId);
        if (!entry) return { class: 'N/A', date: 'N/A' };
        
        const yogaClass = state.classes.find(c => c.id === entry.classId);
        return {
            class: yogaClass?.name || 'Clase eliminada',
            date: `${entry.day}, ${entry.time}`
        };
    };

    return (
        <AdminLayout title="Gestionar Reservas">
            <p className="mb-4 text-gray-600">
                Esta es una lista de todas las reservas simuladas realizadas en el sitio web.
            </p>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Usuario</th>
                            <th className="p-4 text-left font-semibold">Email</th>
                            <th className="p-4 text-left font-semibold">Clase</th>
                            <th className="p-4 text-left font-semibold">Fecha de Clase</th>
                            <th className="p-4 text-left font-semibold">Fecha de Reserva</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.bookings.map(booking => {
                            const details = getScheduleDetails(booking.scheduleId);
                            return (
                                <tr key={booking.id}>
                                    <td className="p-4">{booking.userName}</td>
                                    <td className="p-4">{booking.userEmail}</td>
                                    <td className="p-4 font-medium">{details.class}</td>
                                    <td className="p-4">{details.date}</td>
                                    <td className="p-4">{new Date(booking.bookingDate).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                         {state.bookings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center p-8 text-gray-500">
                                    No hay reservas todavía.
                                </td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};