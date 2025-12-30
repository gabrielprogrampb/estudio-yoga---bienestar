
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="bg-white/50 p-6 rounded-lg shadow-md text-center">
        <p className="text-4xl font-bold text-brand-green-dark font-serif">{value}</p>
        <p className="text-brand-green-dark mt-2">{label}</p>
    </div>
);

export const HomePage: React.FC = () => {
    const { state } = useAppContext();
    const featuredClass = state.classes[0];
    const featuredTeacher = state.teachers[0];

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Encuentra tu Equilibrio Interior</h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">Un santuario de paz y bienestar en el corazón de la ciudad. Únete a nuestra comunidad.</p>
                    <Link to="/horarios" className="bg-brand-violet text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-violet-700 transition-all duration-300 transform hover:scale-105">
                        Ver Horarios
                    </Link>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20 bg-brand-beige">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-4">Bienvenido a tu Espacio de Bienestar</h2>
                    <p className="text-lg text-brand-green-dark max-w-3xl mx-auto">
                        En Estudio Yoga & Bienestar, ofrecemos una variedad de clases, terapias y talleres diseñados para nutrir tu cuerpo, calmar tu mente y elevar tu espíritu.
                    </p>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="py-20 bg-brand-green-light">
                 <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif font-bold text-brand-green-dark mb-12">Nuestro Estudio en Números</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard value={`${state.classes.length}`} label="Tipos de Clases" />
                        <StatCard value={`${state.teachers.length}`} label="Profesores Expertos" />
                        <StatCard value={`${state.therapies.length}`} label="Terapias Holísticas" />
                    </div>
                </div>
            </section>
            
            {/* Featured Class */}
            {featuredClass && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img src={featuredClass.imageUrl} alt={featuredClass.name} className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        </div>
                        <div className="md:w-1/2">
                            <h3 className="text-sm font-semibold text-brand-violet uppercase">Clase Destacada</h3>
                            <h2 className="text-4xl font-serif font-bold text-brand-green-dark mt-2 mb-4">{featuredClass.name}</h2>
                            <p className="text-lg text-brand-green-dark mb-6">{featuredClass.description}</p>
                            <Link to="/clases" className="text-brand-violet font-bold hover:underline">
                                Descubre todas las clases &rarr;
                            </Link>
                        </div>
                    </div>
                </section>
            )}

             {/* Featured Teacher */}
             {featuredTeacher && (
                <section className="py-20 bg-brand-beige">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2">
                            <img src={featuredTeacher.imageUrl} alt={featuredTeacher.name} className="rounded-full shadow-xl w-80 h-80 mx-auto object-cover" />
                        </div>
                        <div className="md:w-1/2 text-center md:text-left">
                            <h3 className="text-sm font-semibold text-brand-violet uppercase">Conoce a Nuestros Guías</h3>
                            <h2 className="text-4xl font-serif font-bold text-brand-green-dark mt-2 mb-4">{featuredTeacher.name}</h2>
                            <p className="text-lg text-brand-green-dark mb-6">{featuredTeacher.bio}</p>
                            <Link to="/clases" className="text-brand-violet font-bold hover:underline">
                                Conoce a todos los profesores &rarr;
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonial */}
            <section className="py-20 bg-brand-green text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-6">Lo que dicen nuestros alumnos</h2>
                    <blockquote className="max-w-3xl mx-auto">
                        <p className="text-xl italic">"{state.reviews[0]?.text}"</p>
                        <cite className="block font-semibold mt-4 not-italic">- {state.reviews[0]?.author}</cite>
                    </blockquote>
                </div>
            </section>
        </div>
    );
};