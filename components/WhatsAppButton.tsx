
import React from 'react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "34123456789"; // Replace with the studio's WhatsApp number
  const message = "Hola, me gustaría recibir más información."; // Optional pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.587-1.54l-6.273 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.887-9.888-9.888-5.451 0-9.887 4.436-9.888 9.888 0 2.05.637 4.04 1.834 5.727l-1.225 4.428 4.52-1.185z" />
        <path d="M18.333 13.985c-.328-.165-1.953-.964-2.258-1.074-.305-.11-1.042.164-1.248.428-.204.264-.78.964-.954 1.15-.175.185-.35.205-.655.04s-1.267-.465-2.413-1.49c-.887-.775-1.484-1.738-1.658-2.027-.174-.29-.018-.445.146-.59.15-.133.33-.346.495-.52.165-.175.22-.29.33-.495.11-.205.055-.385-.025-.53-.08-.145-.735-1.76-1.005-2.42-.265-.645-.53-.555-.735-.555-.195 0-.445.02-.7.02s-.7.105-.98.395c-.285.29-.93.91-1.215 1.765-.285.855.135 1.865.33 2.14.2.275 1.13 1.85 2.915 3.42.455.39.81.62 1.09.81.28.19 1.14.73 1.48 1.03.34.3 1.02.26 1.42.16.4-.1.93-.36 1.08-.7.15-.34.15-.645.1-.81-.05-.165-.165-.255-.33-.41z" />
      </svg>
    </a>
  );
};