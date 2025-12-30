import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { Teacher } from '../../types';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

const TeacherForm = ({ item, onSave, onCancel }: { item?: Teacher, onSave: (item: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(item || { name: '', specialty: '', bio: '', imageUrl: '' });
    const inputStyle = "w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert('Por favor, proporciona una URL de imagen o sube un archivo.');
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} Profesor/a</h3>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className={inputStyle} />
            <input name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Especialidad" required className={inputStyle} />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografía" required className={inputStyle} />

            <div>
                <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputStyle} />
            </div>

            <div className="text-center text-sm text-gray-500">- O -</div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Subir una imagen</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-brand-violet hover:file:bg-violet-100"
                />
            </div>

            {formData.imageUrl && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Previsualización</label>
                    <img src={formData.imageUrl} alt="Previsualización" className="mt-2 rounded-lg shadow-md max-h-48" />
                </div>
            )}

            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
            </div>
        </form>
    );
};

export const ManageTeachers: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Teacher | undefined>(undefined);

    const handleSave = (itemData: any) => {
        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: 'teachers', id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `t${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: 'teachers', item: newItem } });
        }
        setIsFormVisible(false);
        setEditingItem(undefined);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar a este/a profesor/a?')) {
            dispatch({ type: 'DELETE_ITEM', payload: { collection: 'teachers', id } });
        }
    };
    
    const handleEdit = (item: Teacher) => {
        setEditingItem(item);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsFormVisible(true);
    };

    return (
        <AdminLayout title="Gestionar Profesores">
            <div className="mb-6 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircleIcon className="h-5 w-5" />
                    Añadir Nuevo/a Profesor/a
                </button>
            </div>
            {isFormVisible && <div className="mb-6"><TeacherForm item={editingItem} onSave={handleSave} onCancel={() => setIsFormVisible(false)} /></div>}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                     <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nombre</th>
                            <th className="p-4 text-left font-semibold">Especialidad</th>
                            <th className="p-4 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.teachers.map(item => (
                            <tr key={item.id}>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.specialty}</td>
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