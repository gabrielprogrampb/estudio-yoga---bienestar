
import type { AppState } from './types';

export const INITIAL_STATE: AppState = {
  classes: [
    { id: 'c1', name: 'Vinyasa Flow', description: 'Una práctica dinámica que sincroniza movimiento y respiración.', type: 'Vinyasa', imageUrl: 'https://picsum.photos/seed/yoga1/600/400' },
    { id: 'c2', name: 'Hatha Yoga para Principiantes', description: 'Perfecto para empezar, enfocado en posturas básicas y alineación.', type: 'Hatha', imageUrl: 'https://picsum.photos/seed/yoga2/600/400' },
    { id: 'c3', name: 'Meditación Guiada', description: 'Encuentra la calma y reduce el estrés a través de la meditación.', type: 'Meditación', imageUrl: 'https://picsum.photos/seed/yoga3/600/400' },
    { id: 'c4', name: 'Ashtanga Yoga', description: 'Una práctica intensa y disciplinada con una secuencia fija de posturas.', type: 'Ashtanga', imageUrl: 'https://picsum.photos/seed/yoga4/600/400' },
    { id: 'c5', name: 'Yoga Restaurativo', description: 'Relajación profunda a través de posturas pasivas y el uso de soportes.', type: 'Restaurativo', imageUrl: 'https://picsum.photos/seed/yoga5/600/400' },
  ],
  teachers: [
    { id: 't1', name: 'Elena García', specialty: 'Vinyasa y Ashtanga', bio: 'Elena ha practicado yoga por más de 15 años y cree en su poder transformador para cuerpo y mente.', imageUrl: 'https://picsum.photos/seed/teacher1/400/400' },
    { id: 't2', name: 'Carlos Ruiz', specialty: 'Hatha y Yoga Restaurativo', bio: 'Carlos se enfoca en la alineación precisa y el uso de soportes para una práctica segura y profunda.', imageUrl: 'https://picsum.photos/seed/teacher2/400/400' },
    { id: 't3', name: 'Laura Pérez', specialty: 'Meditación y Mindfulness', bio: 'Laura guía a sus estudiantes hacia la calma interior y la claridad mental con su voz serena y su gran sabiduría.', imageUrl: 'https://picsum.photos/seed/teacher3/400/400' },
  ],
  schedule: [
    { id: 's1', day: 'Lunes', time: '09:00', classId: 'c1', teacherId: 't1', room: 'Sala Sol' },
    { id: 's2', day: 'Martes', time: '18:00', classId: 'c2', teacherId: 't2', room: 'Sala Luna' },
    { id: 's3', day: 'Miércoles', time: '09:00', classId: 'c1', teacherId: 't1', room: 'Sala Sol' },
    { id: 's4', day: 'Jueves', time: '19:00', classId: 'c3', teacherId: 't3', room: 'Sala Luna' },
    { id: 's5', day: 'Lunes', time: '19:00', classId: 'c4', teacherId: 't1', room: 'Sala Sol' },
    { id: 's6', day: 'Martes', time: '10:00', classId: 'c3', teacherId: 't3', room: 'Sala Luna' },
    { id: 's7', day: 'Miércoles', time: '18:30', classId: 'c5', teacherId: 't2', room: 'Sala Luna' },
    { id: 's8', day: 'Viernes', time: '09:00', classId: 'c1', teacherId: 't1', room: 'Sala Sol' },
    { id: 's9', day: 'Viernes', time: '17:00', classId: 'c2', teacherId: 't2', room: 'Sala Luna' },
    { id: 's10', day: 'Sábado', time: '10:00', classId: 'c4', teacherId: 't1', room: 'Sala Sol' },
  ],
  therapies: [
    { id: 'th1', name: 'Masaje Terapéutico', description: 'Alivia tensiones musculares y promueve la relajación profunda.', imageUrl: 'https://picsum.photos/seed/therapy1/600/400' },
    { id: 'th2', name: 'Reiki', description: 'Canalización de energía universal para equilibrar cuerpo, mente y espíritu.', imageUrl: 'https://picsum.photos/seed/therapy2/600/400' },
    { id: 'th3', name: 'Reflexología Podal', description: 'Técnica de masaje en puntos clave de los pies para equilibrar la energía del cuerpo.', imageUrl: 'https://picsum.photos/seed/therapy3/600/400' },
  ],
  therapists: [
    { id: 'tp1', name: 'Ana Torres', specialty: 'Masajista y Reiki Master', bio: 'Ana combina técnicas intuitivas con un profundo conocimiento anatómico para sanar.', imageUrl: 'https://picsum.photos/seed/therapist1/400/400' },
    { id: 'tp2', name: 'Marco Vega', specialty: 'Reflexólogo y Quiromasajista', bio: 'Marco tiene manos sanadoras y un profundo conocimiento de los puntos energéticos del cuerpo.', imageUrl: 'https://picsum.photos/seed/therapist2/400/400' },
  ],
  rentals: [
    { id: 'r1', name: 'Sala Sol', description: 'Un espacio amplio y luminoso de 80m², ideal para talleres y eventos. Equipado con esterillas y sistema de sonido.', price: '50€/hora', images: ['https://picsum.photos/seed/sala1/800/600', 'https://picsum.photos/seed/sala2/800/600'] },
    { id: 'r2', name: 'Sala Luna', description: 'Un ambiente íntimo y acogedor de 40m², perfecto para terapias individuales o grupos pequeños.', price: '30€/hora', images: ['https://picsum.photos/seed/sala3/800/600', 'https://picsum.photos/seed/sala4/800/600'] },
  ],
  reviews: [
    { id: 'rev1', author: 'Lucía M.', text: 'Un lugar mágico. Las clases de Elena son pura energía y el estudio es precioso. ¡Totalmente recomendado!', date: '2024-05-15', rating: 5 },
    { id: 'rev2', author: 'Javier P.', text: 'El ambiente es muy acogedor y los profesores son excelentes. He mejorado mucho mi práctica aquí.', date: '2024-04-22', rating: 5 },
    { id: 'rev3', author: 'Ana F.', text: 'El mejor lugar para desconectar. La clase de Hatha para principiantes es genial, muy bien explicada por Carlos.', date: '2024-03-10', rating: 5 },
    { id: 'rev4', author: 'Pedro G.', text: 'Las instalaciones son buenas, aunque a veces la Sala Luna se queda un poco pequeña. Los profesores son de 10.', date: '2024-02-05', rating: 4 },
    { id: 'rev5', author: 'Sofía R.', text: 'He probado el masaje terapéutico con Ana y ha sido una experiencia increíble. Sales flotando. Muy recomendable.', date: '2024-01-18', rating: 5 },
  ],
  bookings: [
    { id: 'b1', scheduleId: 's1', userName: 'Usuario de Ejemplo', userEmail: 'ejemplo@email.com', bookingDate: new Date().toISOString() },
    { id: 'b2', scheduleId: 's4', userName: 'Ana López', userEmail: 'ana@email.com', bookingDate: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'b3', scheduleId: 's2', userName: 'Juan Martínez', userEmail: 'juan@email.com', bookingDate: new Date(Date.now() - 86400000 * 5).toISOString() },
  ],
  legal: {
    privacy: 'Aquí va el texto completo de la Política de Privacidad. El administrador puede editar este contenido desde el panel de gestión.',
    terms: 'Aquí va el texto completo del Aviso Legal. El administrador puede editar este contenido desde el panel de gestión.',
    cookies: 'Aquí va el texto completo de la Política de Cookies. El administrador puede editar este contenido desde el panel de gestión.',
  },
  isAuthenticated: false,
};
