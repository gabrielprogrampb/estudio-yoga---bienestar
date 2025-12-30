
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useAppContext();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be a call to a secure backend.
        // For this MVP, we use hardcoded credentials.
        if (username === 'admin' && password === 'password') {
            dispatch({ type: 'LOGIN' });
            navigate('/admin/dashboard');
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 font-serif">
                    Admin Login
                </h1>
                
                <div className="text-center bg-gray-100 p-3 rounded-md border border-gray-200">
                    <p className="text-sm text-gray-700">
                        Para pruebas, puedes usar:
                        <br />
                        Usuario: <span className="font-semibold text-gray-800">admin</span>
                        <br />
                        Contraseña: <span className="font-semibold text-gray-800">password</span>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Usuario</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password-input" className="text-sm font-bold text-gray-600 block">Contraseña</label>
                        <input
                            id="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-violet"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    <div>
                        <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-brand-green rounded-md hover:bg-brand-green-dark focus:outline-none focus:bg-brand-green-dark">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/" className="text-sm text-brand-green hover:text-brand-green-dark hover:underline transition-colors">
                        Volver al sitio principal
                    </Link>
                </div>
            </div>
        </div>
    );
};
