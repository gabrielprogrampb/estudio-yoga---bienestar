import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAppContext } from '../../context/AppContext';
import type { LegalContent } from '../../types';

export const ManageLegal: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [legalContent, setLegalContent] = useState<LegalContent>(state.legal);
    const [activeTab, setActiveTab] = useState<keyof LegalContent>('privacy');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLegalContent(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        dispatch({
            type: 'UPDATE_LEGAL',
            payload: { section: activeTab, content: legalContent[activeTab] }
        });
        alert(`Contenido de '${activeTab}' actualizado correctamente.`);
    };
    
    const getTitle = (tab: keyof LegalContent) => {
        switch(tab) {
            case 'privacy': return 'Política de Privacidad';
            case 'terms': return 'Aviso Legal';
            case 'cookies': return 'Política de Cookies';
        }
    }

    return (
        <AdminLayout title="Gestionar Textos Legales">
            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {(Object.keys(state.legal) as Array<keyof LegalContent>).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-brand-violet text-brand-violet'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                {getTitle(tab)}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-6">
                     <textarea
                        name={activeTab}
                        value={legalContent[activeTab]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:ring-2 focus:ring-brand-violet focus:outline-none h-96"
                    />
                    <button onClick={handleSave} className="mt-4 py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};