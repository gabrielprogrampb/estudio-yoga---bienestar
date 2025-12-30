import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { YogaClass } from '../../types';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

const ClassForm = ({ item, onSave, onCancel }: { item?: YogaClass, onSave: (item: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(item || { name: '', description: '', type: 'Vinyasa', imageUrl: '' });
    const inputStyle = "w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} Clase</h3>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre de la clase" required className={inputStyle} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" required className={inputStyle} />
            <select name="type" value={formData.type} onChange={handleChange} className={inputStyle}>
                <option>Vinyasa</option>
                <option>Hatha</option>
                <option>Ashtanga</option>
                <option>Restaurativo</option>
                <option>Meditación</option>
            </select>
            
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

export const ManageClasses: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<YogaClass | undefined>(undefined);

    const handleSave = (itemData: any) => {
        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: 'classes', id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `c${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: 'classes', item: newItem } });
        }
        setIsFormVisible(false);
        setEditingItem(undefined);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta clase?')) {
            dispatch({ type: 'DELETE_ITEM', payload: { collection: 'classes', id } });
        }
    };

    const handleEdit = (item: YogaClass) => {
        setEditingItem(item);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsFormVisible(true);
    };

    return (
        <AdminLayout title="Gestionar Clases">
            <div className="mb-6 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircleIcon className="h-5 w-5" />
                    Añadir Nueva Clase
                </button>
            </div>
            {isFormVisible && <div className="mb-6"><ClassForm item={editingItem} onSave={handleSave} onCancel={() => setIsFormVisible(false)} /></div>}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nombre</th>
                            <th className="p-4 text-left font-semibold">Tipo</th>
                            <th className="p-4 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.classes.map(item => (
                            <tr key={item.id}>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.type}</td>
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