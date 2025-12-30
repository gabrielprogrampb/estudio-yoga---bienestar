
export interface YogaClass {
  id: string;
  name: string;
  description: string;
  type: 'Vinyasa' | 'Hatha' | 'Ashtanga' | 'Restaurativo' | 'Meditación';
  imageUrl: string;
}

export interface Teacher {
  id: string;
  name:string;
  specialty: string;
  bio: string;
  imageUrl: string;
}

export interface ScheduleEntry {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  time: string;
  classId: string;
  teacherId: string;
  room: 'Sala Sol' | 'Sala Luna';
}

export interface Therapy {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
}

export interface RentalRoom {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

export interface Review {
  id: string;
  author: string;
  text: string;
  date: string;
  rating: number; // 1-5
}

export interface Booking {
  id: string;
  scheduleId: string;
  userName: string;
  userEmail: string;
  bookingDate: string;
}

export interface LegalContent {
  privacy: string;
  terms: string;
  cookies: string;
}

export interface AppState {
  classes: YogaClass[];
  teachers: Teacher[];
  schedule: ScheduleEntry[];
  therapies: Therapy[];
  therapists: Therapist[];
  rentals: RentalRoom[];
  reviews: Review[];
  bookings: Booking[];
  legal: LegalContent;
  isAuthenticated: boolean;
}

// Action Types for the reducer
export type Action =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ITEM'; payload: { item: any; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: any; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'DELETE_ITEM'; payload: { id: string; collection: keyof Omit<AppState, 'isAuthenticated' | 'legal' | 'bookings'> } }
  | { type: 'UPDATE_LEGAL'; payload: { section: keyof LegalContent; content: string } }
  | { type: 'ADD_BOOKING'; payload: Booking };