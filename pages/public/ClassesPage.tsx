
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { YogaClass, Teacher } from '../../types';
import { Link } from 'react-router-dom';

const ClassCard: React.FC<{ yogaClass: YogaClass }> = ({ yogaClass }) => (
    <Link to={`/clases/${yogaClass.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={yogaClass.imageUrl} alt={yogaClass.name} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-serif font-bold text-brand-green-dark">{yogaClass.name}</h3>
            <p className="text-sm font-semibold text-brand-violet uppercase my-2">{yogaClass.type}</p>
            <p className="text-brand-green-dark">{yogaClass.description}</p>
        </div>
    </Link>
);

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6 flex flex-col items-center">
        <img src={teacher.imageUrl} alt={teacher.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-brand-green-light" />
        <h3 className="text-2xl font-serif font-bold text-brand-green-dark">{teacher.name}</h3>
        <p className="text-brand-violet font-semibold my-2">{teacher.specialty}</p>
        <p className="text-brand-green-dark text-sm">{teacher.bio}</p>
    </div>
);

export const ClassesPage: React.FC = () => {
    const { state } = useAppContext();

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <section id="clases" className="mb-20">
                <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Nuestras Clases</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {state.classes.map(c => <ClassCard key={c.id} yogaClass={c} />)}
                </div>
            </section>

            <section id="profesores">
                 <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Nuestros Profesores</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {state.teachers.map(t => <TeacherCard key={t.id} teacher={t} />)}
                </div>
            </section>
        </div>
    );
};
