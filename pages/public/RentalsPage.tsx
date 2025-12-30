
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { RentalRoom } from '../../types';

const RoomCard: React.FC<{ room: RentalRoom }> = ({ room }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Consulta para "${room.name}" enviada. Nos pondremos en contacto pronto.`);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                    <h2 className="text-3xl font-serif font-bold text-brand-green-dark">{room.name}</h2>
                    <p className="text-lg font-semibold text-brand-violet my-2">{room.price}</p>
                    <p className="text-brand-green-dark mb-6">{room.description}</p>
                    
                    <h3 className="font-bold text-brand-green-dark mb-4">Formulario de Consulta</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nombre" required className="w-full p-2 border rounded mb-3" />
                        <input type="email" placeholder="Email" required className="w-full p-2 border rounded mb-3" />
                        <textarea placeholder="Tu mensaje..." required className="w-full p-2 border rounded mb-3 h-24"></textarea>
                        <button type="submit" className="w-full bg-brand-violet text-white font-bold py-2 px-4 rounded hover:bg-violet-700 transition-colors">
                            Enviar Consulta
                        </button>
                    </form>
                </div>
                 <div className="grid grid-cols-2 gap-2 p-4">
                    {room.images.slice(0, 4).map((img, index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                             <img src={img} alt={`${room.name} ${index + 1}`} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const RentalsPage: React.FC = () => {
    const { state } = useAppContext();

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Alquiler de Salas</h1>
            <p className="text-center text-lg max-w-3xl mx-auto mb-12">
                Ofrecemos espacios hermosos y tranquilos, perfectos para tus eventos, talleres o terapias. Contacta con nosotros para más detalles.
            </p>
            <div>
                {state.rentals.map(room => <RoomCard key={room.id} room={room} />)}
            </div>
        </div>
    );
};