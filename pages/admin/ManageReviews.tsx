import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { Review } from '../../types';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

const ReviewForm = ({ item, onSave, onCancel }: { item?: Review, onSave: (item: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(item || { author: '', text: '', date: new Date().toISOString().split('T')[0], rating: 5 });
    const inputStyle = "w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} Reseña</h3>
            <input name="author" value={formData.author} onChange={handleChange} placeholder="Autor" required className={inputStyle} />
            <textarea name="text" value={formData.text} onChange={handleChange} placeholder="Texto de la reseña" required className={inputStyle} />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className={inputStyle} />
            <select name="rating" value={formData.rating} onChange={handleChange} className={inputStyle}>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Estrellas</option>)}
            </select>
            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
            </div>
        </form>
    );
};

export const ManageReviews: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Review | undefined>(undefined);

    const handleSave = (itemData: any) => {
        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: 'reviews', id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `rev${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: 'reviews', item: newItem } });
        }
        setIsFormVisible(false);
        setEditingItem(undefined);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
            dispatch({ type: 'DELETE_ITEM', payload: { collection: 'reviews', id } });
        }
    };

    const handleEdit = (item: Review) => {
        setEditingItem({
            ...item,
            date: new Date(item.date).toISOString().split('T')[0] // Format date for input
        });
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsFormVisible(true);
    };

    return (
        <AdminLayout title="Gestionar Reseñas">
            <div className="mb-6 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircleIcon className="h-5 w-5" />
                    Añadir Nueva Reseña
                </button>
            </div>
            {isFormVisible && <div className="mb-6"><ReviewForm item={editingItem} onSave={handleSave} onCancel={() => setIsFormVisible(false)} /></div>}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Autor</th>
                            <th className="p-4 text-left font-semibold">Texto</th>
                             <th className="p-4 text-left font-semibold">Rating</th>
                            <th className="p-4 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.reviews.map(item => (
                            <tr key={item.id}>
                                <td className="p-4">{item.author}</td>
                                <td className="p-4 truncate max-w-md">{item.text}</td>
                                <td className="p-4">{item.rating}/5</td>
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