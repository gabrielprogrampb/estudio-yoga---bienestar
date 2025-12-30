
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const TherapyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useAppContext();
    
    const therapy = state.therapies.find(t => t.id === id);

    if (!therapy) {
        return <Navigate to="/terapias" replace />;
    }

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${therapy.imageUrl})` }}>
                <div className="absolute inset-0 bg-black/50"></div>
                 <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                     <h1 className="text-5xl md:text-6xl font-serif font-bold">{therapy.name}</h1>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                 <div className="bg-white p-8 rounded-lg shadow-xl -mt-32 relative z-10">
                    <p className="text-lg text-brand-green-dark leading-relaxed">
                        {therapy.description}
                    </p>

                    <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/contacto" className="bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green-dark transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                           Reservar una Sesión
                        </Link>
                         <Link to="/terapias" className="text-brand-violet font-bold hover:underline w-full sm:w-auto text-center">
                            Ver todas las terapias &rarr;
                        </Link>
                    </div>
                 </div>
            </div>
        </div>
    );
};
