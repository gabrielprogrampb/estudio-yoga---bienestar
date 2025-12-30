
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Therapy, Therapist } from '../../types';
import { Link } from 'react-router-dom';

const TherapyCard: React.FC<{ therapy: Therapy }> = ({ therapy }) => (
    <Link to={`/terapias/${therapy.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-transform transform hover:scale-[1.02] duration-300">
        <img src={therapy.imageUrl} alt={therapy.name} className="w-full md:w-1/3 h-48 md:h-full object-cover" />
        <div className="p-6 flex-1">
            <h3 className="text-2xl font-serif font-bold text-brand-green-dark">{therapy.name}</h3>
            <p className="text-brand-green-dark mt-2">{therapy.description}</p>
        </div>
    </Link>
);

const TherapistCard: React.FC<{ therapist: Therapist }> = ({ therapist }) => (
    <div className="bg-brand-green-light/50 rounded-lg shadow-lg text-center p-6 flex flex-col items-center">
        <img src={therapist.imageUrl} alt={therapist.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-brand-green" />
        <h3 className="text-2xl font-serif font-bold text-brand-green-dark">{therapist.name}</h3>
        <p className="text-brand-violet font-semibold my-2">{therapist.specialty}</p>
        <p className="text-brand-green-dark text-sm">{therapist.bio}</p>
    </div>
);

export const TherapiesPage: React.FC = () => {
    const { state } = useAppContext();

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <section id="terapias" className="mb-20">
                <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Nuestras Terapias</h1>
                <div className="grid grid-cols-1 gap-8">
                    {state.therapies.map(t => <TherapyCard key={t.id} therapy={t} />)}
                </div>
            </section>

            <section id="terapeutas">
                 <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Nuestros Terapeutas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {state.therapists.map(t => <TherapistCard key={t.id} therapist={t} />)}
                </div>
            </section>
        </div>
    );
};
