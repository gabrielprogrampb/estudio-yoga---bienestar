
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { ScheduleEntry } from '../../types';

const daysOfWeek: ScheduleEntry['day'][] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const SchedulePage: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<ScheduleEntry | null>(null);

    const handleBooking = (entry: ScheduleEntry) => {
        setSelectedEntry(entry);
        setShowModal(true);
    };

    const confirmBooking = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        
        if (selectedEntry && name && email) {
            const newBooking = {
                id: `b${Date.now()}`,
                scheduleId: selectedEntry.id,
                userName: name,
                userEmail: email,
                bookingDate: new Date().toISOString()
            };
            dispatch({ type: 'ADD_BOOKING', payload: newBooking });
            setShowModal(false);
            setSelectedEntry(null);
            alert('¡Reserva confirmada! Te hemos enviado un correo con los detalles.');
        }
    };
    
    const getClassName = (id: string) => state.classes.find(c => c.id === id)?.name || 'Clase no encontrada';
    const getTeacherName = (id: string) => state.teachers.find(t => t.id === id)?.name || 'Profesor no encontrado';

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Horario de Clases</h1>
            
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead>
                        <tr className="bg-brand-green-light">
                            {daysOfWeek.map(day => (
                                <th key={day} className="p-4 font-semibold text-brand-green-dark uppercase">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 14 }).map((_, hourIndex) => { // From 8:00 to 21:00
                            const hour = 8 + hourIndex;
                            const time = `${hour}:00`;
                            return (
                                <tr key={time} className="border-b border-gray-200">
                                    {daysOfWeek.map(day => {
                                        const entry = state.schedule.find(s => s.day === day && s.time.startsWith(String(hour).padStart(2, '0')));
                                        return (
                                            <td key={`${day}-${time}`} className="p-3 align-top h-32">
                                                <span className="text-xs text-gray-400">{time}</span>
                                                {entry ? (
                                                    <div className="bg-brand-violet/10 p-3 rounded-lg mt-1 h-full flex flex-col justify-between">
                                                        <div>
                                                          <p className="font-bold text-brand-green-dark text-sm">{getClassName(entry.classId)}</p>
                                                          <p className="text-xs text-gray-600">{getTeacherName(entry.teacherId)}</p>
                                                          <p className="text-xs text-brand-violet font-semibold">{entry.room}</p>
                                                        </div>
                                                        <button onClick={() => handleBooking(entry)} className="mt-2 w-full bg-brand-violet text-white text-xs font-bold py-1 px-2 rounded hover:bg-violet-700 transition-colors">
                                                            Reservar
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {showModal && selectedEntry && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold font-serif mb-4">Confirmar Reserva</h2>
                        <p><strong>Clase:</strong> {getClassName(selectedEntry.classId)}</p>
                        <p><strong>Día:</strong> {selectedEntry.day} a las {selectedEntry.time}</p>
                        <p><strong>Profesor:</strong> {getTeacherName(selectedEntry.teacherId)}</p>
                        <form onSubmit={confirmBooking} className="mt-6">
                            <input name="name" type="text" placeholder="Tu Nombre" required className="w-full p-2 border rounded mb-4" />
                            <input name="email" type="email" placeholder="Tu Email" required className="w-full p-2 border rounded mb-4" />
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                                <button type="submit" className="py-2 px-4 bg-brand-violet text-white rounded hover:bg-violet-700">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};