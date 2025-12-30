
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon } from './icons';

const NavItem = ({ to, children, onClick }: { to: string; children: React.ReactNode, onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `font-serif text-lg transition-colors duration-300 ${
        isActive ? 'text-brand-gold' : 'text-brand-green-dark hover:text-brand-gold'
      }`
    }
  >
    {children}
  </NavLink>
);

const DropdownLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void; }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-4 py-2 text-sm w-full text-left ${
        isActive ? 'text-brand-violet font-semibold' : 'text-brand-green-dark hover:bg-gray-100'
      }`
    }
  >
    {children}
  </NavLink>
);


const DropdownNavItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center font-serif text-lg transition-colors duration-300 text-brand-green-dark hover:text-brand-gold focus:outline-none">
        {title}
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
          {children}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 bg-brand-beige/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold font-serif text-brand-green-dark">
            Estudio Yoga & Bienestar
          </NavLink>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
             <DropdownNavItem title="Servicios">
                <DropdownLink to="/clases" onClick={() => {}}>Clases</DropdownLink>
                <DropdownLink to="/horarios" onClick={() => {}}>Horarios</DropdownLink>
                <DropdownLink to="/terapias" onClick={() => {}}>Terapias</DropdownLink>
                <DropdownLink to="/alquiler" onClick={() => {}}>Alquiler de Salas</DropdownLink>
            </DropdownNavItem>
            <NavItem to="/resenas">Reseñas</NavItem>
            <NavItem to="/contacto">Contacto</NavItem>
            <NavItem to="/admin/login">Admin</NavItem>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="bg-brand-green text-white font-semibold py-2 px-4 rounded-full hover:bg-brand-green-dark transition-colors duration-300">
              Tienda
            </a>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-green-dark focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col items-center space-y-4">
            <div className="w-full text-center">
              <button onClick={() => setServicesOpen(!isServicesOpen)} className="font-serif text-lg text-brand-green-dark hover:text-brand-gold flex items-center justify-center w-full py-2">
                Servicios
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="flex flex-col items-center space-y-4 pt-2 bg-brand-green-light/20 rounded-lg">
                  <NavItem to="/clases" onClick={closeMobileMenu}>Clases</NavItem>
                  <NavItem to="/horarios" onClick={closeMobileMenu}>Horarios</NavItem>
                  <NavItem to="/terapias" onClick={closeMobileMenu}>Terapias</NavItem>
                  <NavItem to="/alquiler" onClick={closeMobileMenu}>Alquiler de Salas</NavItem>
                </div>
              )}
            </div>
            <NavItem to="/resenas" onClick={closeMobileMenu}>Reseñas</NavItem>
            <NavItem to="/contacto" onClick={closeMobileMenu}>Contacto</NavItem>
            <NavItem to="/admin/login" onClick={closeMobileMenu}>Admin</NavItem>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="bg-brand-green text-white font-semibold py-2 px-4 rounded-full hover:bg-brand-green-dark transition-colors duration-300">
              Tienda
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};
