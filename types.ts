// =============================================================================
// types.ts - Definiciones de Tipos TypeScript
// =============================================================================
// Descripción: Define todas las interfaces y tipos utilizados en la aplicación
// del estudio de yoga. Incluye clases, profesores, terapias, reservas, etc.
// =============================================================================

/**
 * Interfaz para clases de yoga
 * Representa cada tipo de clase ofrecida
 */
export interface YogaClass {
  id: string;           // Identificador único
  name: string;         // Nombre de la clase
  description: string;  // Descripción detallada
  type: 'Vinyasa' | 'Hatha' | 'Ashtanga' | 'Restaurativo' | 'Meditación'; // Tipo de yoga
  imageUrl: string;     // URL de la imagen representativa
}

/**
 * Interfaz para profesores/instructores
 */
export interface Teacher {
  id: string;           // Identificador único
  name: string;         // Nombre del profesor
  specialty: string;    // Especialidad (tipo de yoga)
  bio: string;          // Biografía corta
  imageUrl: string;     // Foto del profesor
}

/**
 * Interfaz para entradas del horario
 * Representa una clase programada en el calendario
 */
export interface ScheduleEntry {
  id: string;           // Identificador único
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  time: string;         // Hora de inicio (ej: "09:00")
  classId: string;      // ID de la clase
  teacherId: string;    // ID del profesor
  room: 'Sala Sol' | 'Sala Luna'; // Sala donde se imparte
}

/**
 * Interfaz para terapias alternativas
 */
export interface Therapy {
  id: string;           // Identificador único
  name: string;         // Nombre de la terapia
  description: string;  // Descripción del tratamiento
  imageUrl: string;     // Imagen representativa
}

/**
 * Interfaz para terapeutas
 */
export interface Therapist {
  id: string;           // Identificador único
  name: string;         // Nombre del terapeuta
  specialty: string;    // Especialidad
  bio: string;          // Biografía
  imageUrl: string;     // Foto del terapeuta
}

/**
 * Interfaz para salas de alquiler
 */
export interface RentalRoom {
  id: string;           // Identificador único
  name: string;         // Nombre del espacio
  description: string;  // Descripción del espacio
  price: string;        // Precio por hora/día
  images: string[];     // Galería de imágenes
}

/**
 * Interfaz para reseñas/testimonios
 */
export interface Review {
  id: string;           // Identificador único
  author: string;       // Nombre del autor
  text: string;         // Contenido de la reseña
  date: string;         // Fecha de la reseña
  rating: number;       // Puntuación (1-5 estrellas)
}

/**
 * Interfaz para reservas de clases
 */
export interface Booking {
  id: string;           // Identificador único
  scheduleId: string;   // ID de la entrada del horario
  userName: string;     // Nombre del usuario
  userEmail: string;    // Email del usuario
  bookingDate: string;  // Fecha de la reserva
}

/**
 * Interfaz para contenido legal
 */
export interface LegalContent {
  privacy: string;      // Política de privacidad
  terms: string;        // Términos y condiciones
  cookies: string;      // Política de cookies
}

/**
 * Estado global de la aplicación
 * Contiene todas las colecciones de datos
 */
export interface AppState {
  classes: YogaClass[];         // Lista de clases
  teachers: Teacher[];          // Lista de profesores
  schedule: ScheduleEntry[];    // Horario semanal
  therapies: Therapy[];         // Lista de terapias
  therapists: Therapist[];      // Lista de terapeutas
  rentals: RentalRoom[];        // Espacios de alquiler
  reviews: Review[];            // Reseñas de clientes
  bookings: Booking[];          // Reservas activas
  legal: LegalContent;          // Contenido legal
  isAuthenticated: boolean;     // Estado de autenticación
}

/**
 * Tipos de acciones para el reducer
 * Define todas las operaciones posibles sobre el estado
 */
export type Action =
  | { type: 'LOGIN' }   // Iniciar sesión
  | { type: 'LOGOUT' }  // Cerrar sesión
  | { type: 'ADD_ITEM'; payload: { item: any; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: any; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'DELETE_ITEM'; payload: { id: string; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'UPDATE_LEGAL'; payload: { section: keyof LegalContent; content: string } }
  | { type: 'ADD_BOOKING'; payload: Booking };