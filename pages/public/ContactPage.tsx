
import React from 'react';

export const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Contacto</h1>
            <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-lg shadow-xl">
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-serif font-bold text-brand-green-dark mb-4">Envíanos un Mensaje</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-brand-green-dark font-semibold mb-2">Nombre</label>
                            <input type="text" id="name" name="name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-violet focus:border-brand-violet" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-brand-green-dark font-semibold mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-violet focus:border-brand-violet" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-brand-green-dark font-semibold mb-2">Asunto</label>
                            <input type="text" id="subject" name="subject" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-violet focus:border-brand-violet" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-brand-green-dark font-semibold mb-2">Mensaje</label>
                            <textarea id="message" name="message" rows={5} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-violet focus:border-brand-violet"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-brand-violet text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors duration-300">
                            Enviar
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-serif font-bold text-brand-green-dark mb-4">Encuéntranos</h2>
                    <div className="aspect-w-16 aspect-h-9">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225721591544!2d-122.41941548468128!3d37.77492957975949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1e285d1b%3A0x8f2d4f8b9d3c5b8b!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1628526135835!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true}
                            loading="lazy"
                            className="rounded-lg"
                        ></iframe>
                    </div>
                    <div className="mt-6 text-brand-green-dark">
                        <p><strong>Dirección:</strong> C/ de la Armonía, 123, 08001 Barcelona</p>
                        <p><strong>Teléfono:</strong> +34 931 234 567</p>
                        <p><strong>Email:</strong> info@estudioyoga.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};