import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green-dark text-brand-beige mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-serif font-bold text-white">Estudio Yoga & Bienestar</h3>
            <p className="text-brand-green-light mt-2">C/ de la Armonía, 123, 08001 Barcelona</p>
            <p className="text-brand-green-light">info@estudioyoga.com</p>
          </div>
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h4 className="font-semibold text-white mb-2">Legal</h4>
            <Link to="/legal/privacy" className="text-brand-green-light hover:text-brand-gold transition-colors">Política de Privacidad</Link>
            <Link to="/legal/terms" className="text-brand-green-light hover:text-brand-gold transition-colors mt-1">Aviso Legal</Link>
            <Link to="/legal/cookies" className="text-brand-green-light hover:text-brand-gold transition-colors mt-1">Política de Cookies</Link>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Síguenos</h4>
            {/* Replace with actual social media links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-brand-green-light hover:text-brand-gold"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
              <a href="#" className="text-brand-green-light hover:text-brand-gold"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-4.168 2.937c-.846.043-1.291.191-1.634.33a3.52 3.52 0 00-1.288.771 3.52 3.52 0 00-.771 1.288c-.139.343-.287.788-.33 1.634-.043 1.022-.055 1.353-.055 3.774s.012 2.752.055 3.774c.043.846.191 1.291.33 1.634.195.484.45.87.771 1.288.322.418.704.673 1.288.771.343.139.788.287 1.634.33 1.022.043 1.353.055 3.774.055s2.752-.012 3.774-.055c.846-.043 1.291-.191 1.634-.33.484-.195.87-.45 1.288-.771.418-.322.673-.704.771-1.288.139-.343.287-.788.33-1.634.043-1.022.055-1.353.055-3.774s-.012-2.752-.055-3.774c-.043-.846-.191-1.291-.33-1.634a3.52 3.52 0 00-.771-1.288 3.52 3.52 0 00-1.288-.771c-.343-.139-.788-.287-1.634-.33-1.022-.043-1.353-.055-3.774-.055s-2.752.012-3.774.055zm2.182 2.522a5.002 5.002 0 00-4.99 4.99c0 2.761 2.23 4.99 4.99 4.99s4.99-2.23 4.99-4.99a5.002 5.002 0 00-4.99-4.99zm0 8.162c-1.78 0-3.223-1.443-3.223-3.223s1.443-3.223 3.223-3.223 3.223 1.443 3.223 3.223-1.443 3.223-3.223 3.223zm4.56-8.243a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" /></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-brand-green-light pt-4 text-center text-brand-green-light">
          <p>&copy; {new Date().getFullYear()} Estudio Yoga & Bienestar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};