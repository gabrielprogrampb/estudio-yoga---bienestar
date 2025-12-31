# 🧘 Estudio Yoga & Bienestar

Aplicación web completa para un estudio de yoga con sistema de reservas y gestión integral.

## 📋 Descripción

Estudio Yoga & Bienestar es una plataforma web para un centro de yoga y bienestar. Permite a los usuarios explorar clases, consultar horarios, conocer terapias alternativas, ver espacios de alquiler, leer testimonios y realizar reservas. Incluye un panel de administración completo.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Navegación SPA
- **Tailwind CSS** - Framework de estilos
- **Context API** - Estado global

## 📁 Estructura del Proyecto

```
estudio-yoga-&-bienestar/
├── components/
│   ├── Header.tsx         # Navegación principal
│   ├── Footer.tsx         # Pie de página
│   └── WhatsAppButton.tsx # Botón flotante de WhatsApp
├── context/
│   └── AppContext.tsx     # Estado global y reducer
├── pages/
│   ├── public/            # Páginas públicas
│   │   ├── HomePage.tsx
│   │   ├── ClassesPage.tsx
│   │   ├── ClassDetailPage.tsx
│   │   ├── SchedulePage.tsx
│   │   ├── TherapiesPage.tsx
│   │   ├── TherapyDetailPage.tsx
│   │   ├── RentalsPage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── LegalPage.tsx
│   └── admin/             # Páginas de administración
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── ManageClasses.tsx
│       ├── ManageTeachers.tsx
│       ├── ManageSchedule.tsx
│       ├── ManageTherapies.tsx
│       ├── ManageRentals.tsx
│       ├── ManageReviews.tsx
│       ├── ManageLegal.tsx
│       └── ManageBookings.tsx
├── App.tsx                # Componente principal
├── index.tsx              # Punto de entrada
└── types.ts               # Definiciones de tipos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd estudio-yoga-&-bienestar
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

### Para Visitantes
- **Explorar clases** - Ver tipos de yoga disponibles
- **Consultar horarios** - Calendario semanal de clases
- **Conocer terapias** - Información sobre tratamientos alternativos
- **Ver espacios** - Salas disponibles para alquiler
- **Leer testimonios** - Reseñas de otros clientes
- **Reservar clases** - Sistema de reservas en línea
- **Contacto por WhatsApp** - Botón flotante de contacto directo

### Para Administradores
- **Dashboard** - Vista general del estudio
- **Gestión de clases** - CRUD de tipos de yoga
- **Gestión de profesores** - Administrar instructores
- **Gestión de horarios** - Programar clases
- **Gestión de terapias** - Administrar tratamientos
- **Gestión de espacios** - Administrar alquileres
- **Gestión de reseñas** - Moderar testimonios
- **Gestión legal** - Editar contenido legal
- **Gestión de reservas** - Ver y administrar reservas

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
