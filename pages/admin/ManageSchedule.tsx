import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { ScheduleEntry, YogaClass, Teacher } from '../../types';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

const ScheduleForm = ({ item, onSave, onCancel, classes, teachers }: { item?: ScheduleEntry, onSave: (item: any) => void, onCancel: () => void, classes: YogaClass[], teachers: Teacher[] }) => {
    const [formData, setFormData] = useState(item || { day: 'Lunes', time: '09:00', classId: classes[0]?.id || '', teacherId: teachers[0]?.id || '', room: 'Sala Sol' });
    const inputStyle = "w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.classId || !formData.teacherId) {
            alert("Por favor, selecciona una clase y un profesor.");
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} Entrada de Horario</h3>
            <select name="day" value={formData.day} onChange={handleChange} className={inputStyle}>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(d => <option key={d}>{d}</option>)}
            </select>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required className={inputStyle} />
             <select name="classId" value={formData.classId} onChange={handleChange} required className={inputStyle}>
                <option value="">-- Selecciona una clase --</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
             <select name="teacherId" value={formData.teacherId} onChange={handleChange} required className={inputStyle}>
                <option value="">-- Selecciona un profesor --</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select name="room" value={formData.room} onChange={handleChange} className={inputStyle}>
                <option>Sala Sol</option>
                <option>Sala Luna</option>
            </select>
            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
            </div>
        </form>
    );
};


export const ManageSchedule: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<ScheduleEntry | undefined>(undefined);

    const handleSave = (itemData: any) => {
        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: 'schedule', id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `s${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: 'schedule', item: newItem } });
        }
        setIsFormVisible(false);
        setEditingItem(undefined);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta entrada del horario?')) {
            dispatch({ type: 'DELETE_ITEM', payload: { collection: 'schedule', id } });
        }
    };
    
    const handleEdit = (item: ScheduleEntry) => {
        setEditingItem(item);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsFormVisible(true);
    };
    
    const getClassName = (id: string) => state.classes.find(c => c.id === id)?.name || 'N/A';
    const getTeacherName = (id: string) => state.teachers.find(t => t.id === id)?.name || 'N/A';

    return (
        <AdminLayout title="Gestionar Horarios">
            <div className="mb-6 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircleIcon className="h-5 w-5" />
                    Añadir al Horario
                </button>
            </div>
            {isFormVisible && <div className="mb-6"><ScheduleForm item={editingItem} onSave={handleSave} onCancel={() => setIsFormVisible(false)} classes={state.classes} teachers={state.teachers} /></div>}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                     <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Día</th>
                            <th className="p-4 text-left font-semibold">Hora</th>
                            <th className="p-4 text-left font-semibold">Clase</th>
                            <th className="p-4 text-left font-semibold">Profesor/a</th>
                             <th className="p-4 text-left font-semibold">Sala</th>
                            <th className="p-4 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.schedule.sort((a,b) => a.time.localeCompare(b.time)).sort((a,b) => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].indexOf(a.day) - ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].indexOf(b.day)).map(item => (
                            <tr key={item.id}>
                                <td className="p-4">{item.day}</td>
                                <td className="p-4">{item.time}</td>
                                <td className="p-4">{getClassName(item.classId)}</td>
                                <td className="p-4">{getTeacherName(item.teacherId)}</td>
                                <td className="p-4">{item.room}</td>
                                <td className="p-4 flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:text-blue-800"><EditIcon /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:text-red-800"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};