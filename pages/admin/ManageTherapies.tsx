import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import { EditIcon, TrashIcon, PlusCircleIcon } from '../../components/icons';

// Generic Form for Therapy and Therapist
const ItemForm = ({ item, onSave, onCancel, type }: { item?: any, onSave: (item: any) => void, onCancel: () => void, type: 'therapy' | 'therapist' }) => {
    const isTherapy = type === 'therapy';
    const initialData = isTherapy 
        ? { name: '', description: '', imageUrl: '' } 
        : { name: '', specialty: '', bio: '', imageUrl: '' };
    const [formData, setFormData] = useState(item || initialData);
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
            <h3 className="text-xl font-bold">{item ? 'Editar' : 'Añadir'} {isTherapy ? 'Terapia' : 'Terapeuta'}</h3>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className={inputStyle} />
            {isTherapy ? (
                 <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" required className={inputStyle} />
            ) : (
                <>
                    <input name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Especialidad" required className={inputStyle} />
                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografía" required className={inputStyle} />
                </>
            )}

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

// Generic List for Therapy and Therapist
const ItemList = ({ items, onEdit, onDelete, type }: { items: any[], onEdit: (item: any) => void, onDelete: (id: string) => void, type: 'therapy' | 'therapist' }) => (
     <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-4 text-left font-semibold">Nombre</th>
                    <th className="p-4 text-left font-semibold">{type === 'therapy' ? 'Descripción' : 'Especialidad'}</th>
                    <th className="p-4 text-left font-semibold">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {items.map(item => (
                    <tr key={item.id}>
                        <td className="p-4">{item.name}</td>
                        <td className="p-4 truncate max-w-sm">{type === 'therapy' ? item.description : item.specialty}</td>
                        <td className="p-4 flex gap-2">
                            <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:text-blue-800"><EditIcon /></button>
                            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:text-red-800"><TrashIcon /></button>
                        </td>
                    </tr>
                ))}
                 {items.length === 0 && (
                    <tr>
                        <td colSpan={3} className="text-center p-8 text-gray-500">
                            No hay {type === 'therapy' ? 'terapias' : 'terapeutas'} todavía.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);


export const ManageTherapies: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [editingItem, setEditingItem] = useState<any>(undefined);
    const [formType, setFormType] = useState<'therapy' | 'therapist' | null>(null);

    const handleSave = (itemData: any) => {
        if (!formType) return;
        const collection = formType === 'therapy' ? 'therapies' : 'therapists';
        const prefix = formType === 'therapy' ? 'th' : 'tp';

        if (editingItem) {
            dispatch({ type: 'UPDATE_ITEM', payload: { collection: collection as any, id: editingItem.id, updates: itemData } });
        } else {
            const newItem = { ...itemData, id: `${prefix}${Date.now()}` };
            dispatch({ type: 'ADD_ITEM', payload: { collection: collection as any, item: newItem } });
        }
        setFormType(null);
        setEditingItem(undefined);
    };

    const handleDelete = (id: string, type: 'therapy' | 'therapist') => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            const collection = type === 'therapy' ? 'therapies' : 'therapists';
            dispatch({ type: 'DELETE_ITEM', payload: { collection: collection as any, id } });
        }
    };

    const handleEdit = (item: any, type: 'therapy' | 'therapist') => {
        setEditingItem(item);
        setFormType(type);
    };

    const handleAddNew = (type: 'therapy' | 'therapist') => {
        setEditingItem(undefined);
        setFormType(type);
    };
    
    const handleCancel = () => {
        setEditingItem(undefined);
        setFormType(null);
    }

    return (
        <AdminLayout title="Gestionar Terapias y Terapeutas">
            {formType && (
                <div className="mb-8">
                    <ItemForm item={editingItem} onSave={handleSave} onCancel={handleCancel} type={formType} />
                </div>
            )}

            <div className="space-y-12">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Terapias</h2>
                        <button onClick={() => handleAddNew('therapy')} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                            <PlusCircleIcon className="h-5 w-5" /> Añadir Terapia
                        </button>
                    </div>
                    <ItemList items={state.therapies} onEdit={(item) => handleEdit(item, 'therapy')} onDelete={(id) => handleDelete(id, 'therapy')} type="therapy" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Terapeutas</h2>
                        <button onClick={() => handleAddNew('therapist')} className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                             <PlusCircleIcon className="h-5 w-5" /> Añadir Terapeuta
                        </button>
                    </div>
                    <ItemList items={state.therapists} onEdit={(item) => handleEdit(item, 'therapist')} onDelete={(id) => handleDelete(id, 'therapist')} type="therapist" />
                </div>
            </div>
        </AdminLayout>
    );
};