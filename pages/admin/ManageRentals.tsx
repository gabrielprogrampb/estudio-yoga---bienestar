import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { RentalRoom } from '../../types';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

const RentalForm = ({ item, onSave, onCancel }: { item?: RentalRoom, onSave: (item: any) => void, onCancel: () => void }) => {
    const [formState, setFormState] = useState(item || { name: '', description: '', price: '', images: [] as string[] });
    const [imageUrl, setImageUrl] = useState('');
    const inputStyle = "w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormState(prev => ({ ...prev, images: [...prev.images, reader.result as string] }));
                };
                reader.readAsDataURL(file);
            });
            e.target.value = ''; // Allow re-uploading the same file
        }
    };

    const handleAddUrl = () => {
        if (imageUrl.trim() && !formState.images.includes(imageUrl.trim())) {
            setFormState(prev => ({ ...prev, images: [...prev.images, imageUrl.trim()] }));
            setImageUrl('');
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setFormState(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.images.length === 0) {
            alert("Por favor, añade al menos una imagen para la sala.");
            return;
        }
        onSave(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} Sala de Alquiler</h3>
            <input name="name" value={formState.name} onChange={handleChange} placeholder="Nombre de la sala" required className={inputStyle} />
            <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Descripción" required className={inputStyle} />
            <input name="price" value={formState.price} onChange={handleChange} placeholder="Precio (e.g., 50€/hora)" required className={inputStyle} />
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                
                {formState.images.length > 0 && (
                     <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
                        {formState.images.map((img, index) => (
                            <div key={index} className="relative group">
                                <img src={img} alt={`Previsualización ${index + 1}`} className="w-full h-24 object-cover rounded-lg shadow-md" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-4 p-4 border border-dashed rounded-lg">
                    <div className="flex items-center gap-2">
                         <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Añadir URL de imagen" className={inputStyle} />
                        <button type="button" onClick={handleAddUrl} className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-semibold shrink-0">Añadir URL</button>
                    </div>

                    <div className="text-center text-sm text-gray-500">- O -</div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Subir una o más imágenes</label>
                        <input
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/webp, image/gif"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-brand-violet hover:file:bg-violet-100"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
            </div>
        </form>
    );
};

export const ManageRentals: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<RentalRoom | undefined>(undefined);

    const handleSave = (itemData: any) => {
        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: 'rentals', id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `r${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: 'rentals', item: newItem } });
        }
        setIsFormVisible(false);
        setEditingItem(undefined);
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta sala?')) {
            dispatch({ type: 'DELETE_ITEM', payload: { collection: 'rentals', id } });
        }
    };

    const handleEdit = (item: RentalRoom) => {
        setEditingItem(item);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsFormVisible(true);
    };

    return (
        <AdminLayout title="Gestionar Alquiler de Salas">
            <div className="mb-6 flex justify-end">
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    <PlusCircleIcon className="h-5 w-5" />
                    Añadir Nueva Sala
                </button>
            </div>
            {isFormVisible && <div className="mb-6"><RentalForm item={editingItem} onSave={handleSave} onCancel={() => setIsFormVisible(false)} /></div>}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nombre</th>
                            <th className="p-4 text-left font-semibold">Precio</th>
                            <th className="p-4 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {state.rentals.map(item => (
                            <tr key={item.id}>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.price}</td>
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