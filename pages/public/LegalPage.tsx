
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import type { LegalContent } from '../../types';

export const LegalPage: React.FC = () => {
    const { type } = useParams<{ type: keyof LegalContent }>();
    const { state } = useAppContext();

    if (!type || !state.legal[type]) {
        return <Navigate to="/" />;
    }

    const titles = {
        privacy: 'Política de Privacidad',
        terms: 'Aviso Legal',
        cookies: 'Política de Cookies',
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-8">{titles[type]}</h1>
                <div className="prose lg:prose-xl max-w-none text-brand-green-dark" dangerouslySetInnerHTML={{ __html: state.legal[type].replace(/\n/g, '<br />') }}>
                    {/* Content is set via dangerouslySetInnerHTML */}
                </div>
            </div>
        </div>
    );
};