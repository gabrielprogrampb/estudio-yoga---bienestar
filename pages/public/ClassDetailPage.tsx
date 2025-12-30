
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const ClassDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useAppContext();
    
    const yogaClass = state.classes.find(c => c.id === id);

    if (!yogaClass) {
        return <Navigate to="/clases" replace />;
    }

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${yogaClass.imageUrl})` }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                     <h1 className="text-5xl md:text-6xl font-serif font-bold">{yogaClass.name}</h1>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                 <div className="bg-white p-8 rounded-lg shadow-xl -mt-32 relative z-10">
                    <div className="text-center mb-8">
                        <span className="bg-brand-violet text-white font-semibold py-1 px-3 rounded-full text-sm uppercase tracking-wider">{yogaClass.type}</span>
                    </div>
                    
                    <p className="text-lg text-brand-green-dark leading-relaxed">
                        {yogaClass.description}
                    </p>

                    <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/horarios" className="bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green-dark transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                           Ver Horarios de Clases
                        </Link>
                         <Link to="/clases" className="text-brand-violet font-bold hover:underline w-full sm:w-auto text-center">
                            Ver todas las clases &rarr;
                        </Link>
                    </div>
                 </div>
            </div>
        </div>
    );
};
