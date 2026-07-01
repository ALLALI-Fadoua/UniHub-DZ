export const EVENT_CATEGORIES = [
  { value: 'conference', label: 'Conférence' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Atelier' },
  { value: 'fair', label: 'Salon' },
  { value: 'competition', label: 'Concours' },
  { value: 'training', label: 'Formation' },
];

export const EVENTS = [
  {
    id: 'evt-001',
    title: 'Algiers AI Summit 2026',
    category: 'conference',
    clubId: 'club-001',
    clubName: 'GDG Algiers',
    city: 'Alger',
    mode: 'Présentiel',
    date: '2026-07-12',
    time: '09:00',
    price: 'Gratuit',
    cover: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
    description:
      "Une journée complète dédiée à l'intelligence artificielle avec des intervenants locaux et internationaux, ateliers pratiques et networking.",
    seatsAvailable: 42,
    seatsTotal: 200,
    featured: true,
  },
  {
    id: 'evt-002',
    title: 'Hackathon FinTech DZ',
    category: 'hackathon',
    clubId: 'club-002',
    clubName: 'ENSIA Tech Club',
    city: 'Oran',
    mode: 'Présentiel',
    date: '2026-07-20',
    time: '08:00',
    price: 'Gratuit',
    cover: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    description:
      '48h pour concevoir une solution FinTech innovante. Prix pour les 3 meilleures équipes, mentorat par des experts du secteur bancaire.',
    seatsAvailable: 8,
    seatsTotal: 120,
    featured: true,
  },
  {
    id: 'evt-003',
    title: 'Atelier UI/UX Design Thinking',
    category: 'workshop',
    clubId: 'club-003',
    clubName: 'Design Club USTHB',
    city: 'Alger',
    mode: 'Présentiel',
    date: '2026-06-30',
    time: '14:00',
    price: '500 DA',
    cover: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800',
    description:
      'Apprenez les fondamentaux du Design Thinking appliqué au UI/UX à travers des cas pratiques sur Figma.',
    seatsAvailable: 15,
    seatsTotal: 40,
    featured: false,
  },
  {
    id: 'evt-004',
    title: 'Salon de l\'Entrepreneuriat Étudiant',
    category: 'fair',
    clubId: 'club-004',
    clubName: 'Junior Entreprise Constantine',
    city: 'Constantine',
    mode: 'Présentiel',
    date: '2026-08-02',
    time: '10:00',
    price: 'Gratuit',
    cover: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
    description:
      "Rencontrez des startups, incubateurs et investisseurs. Stands, pitchs et sessions de mentorat pour les porteurs de projets.",
    seatsAvailable: 120,
    seatsTotal: 300,
    featured: true,
  },
  {
    id: 'evt-005',
    title: 'Concours National de Robotique',
    category: 'competition',
    clubId: 'club-005',
    clubName: 'Robotics Club ESI',
    city: 'Alger',
    mode: 'Présentiel',
    date: '2026-09-10',
    time: '09:00',
    price: 'Gratuit',
    cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    description:
      'Compétition inter-universitaire de robotique autonome. Catégories junior et senior, dotation totale de 500 000 DA.',
    seatsAvailable: 0,
    seatsTotal: 64,
    featured: false,
  },
  {
    id: 'evt-006',
    title: 'Formation Git & GitHub pour Débutants',
    category: 'training',
    clubId: 'club-002',
    clubName: 'ENSIA Tech Club',
    city: 'Oran',
    mode: 'En ligne',
    date: '2026-07-05',
    time: '18:00',
    price: 'Gratuit',
    cover: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
    description:
      'Session en ligne pour maîtriser les bases du contrôle de version avec Git et collaborer efficacement sur GitHub.',
    seatsAvailable: 65,
    seatsTotal: 100,
    featured: false,
  },
];

export const getFeaturedEvents = () => EVENTS.filter((e) => e.featured);

export const getEventById = (id) => EVENTS.find((e) => e.id === id);

export const getEventsByClub = (clubId) =>
  EVENTS.filter((e) => e.clubId === clubId);

// --- Mutateurs mock (CRUD en mémoire, à remplacer par eventService -> API) ---

export const addEvent = (eventData) => {
  const newEvent = {
    id: `evt-${Date.now()}`,
    seatsAvailable: Number(eventData.seatsTotal) || 0,
    featured: false,
    ...eventData,
  };
  EVENTS.push(newEvent);
  return newEvent;
};

export const updateEvent = (id, updates) => {
  const index = EVENTS.findIndex((e) => e.id === id);
  if (index === -1) return null;
  EVENTS[index] = { ...EVENTS[index], ...updates };
  return EVENTS[index];
};

export const deleteEvent = (id) => {
  const index = EVENTS.findIndex((e) => e.id === id);
  if (index === -1) return false;
  EVENTS.splice(index, 1);
  return true;
};