export const CLUBS = [
  {
    id: 'club-001',
    name: 'GDG Algiers',
    university: 'Université des Sciences et de la Technologie Houari Boumediene',
    city: 'Alger',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=GDGAlgiers',
    category: 'Tech',
    membersCount: 850,
    description:
      "Communauté de développeurs et passionnés de technologie soutenue par Google Developer Groups.",
    eventsCount: 14,
  },
  {
    id: 'club-002',
    name: 'ENSIA Tech Club',
    university: "École Nationale Supérieure d'Intelligence Artificielle",
    city: 'Oran',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=ENSIATech',
    category: 'Tech',
    membersCount: 420,
    description:
      "Club étudiant dédié à l'IA, au développement logiciel et à l'organisation de hackathons.",
    eventsCount: 9,
  },
  {
    id: 'club-003',
    name: 'Design Club USTHB',
    university: 'USTHB',
    city: 'Alger',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=DesignUSTHB',
    category: 'Design',
    membersCount: 210,
    description:
      'Collectif étudiant autour du design graphique, UI/UX et de la créativité numérique.',
    eventsCount: 6,
  },
  {
    id: 'club-004',
    name: 'Junior Entreprise Constantine',
    university: 'Université Constantine 2',
    city: 'Constantine',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=JEConstantine',
    category: 'Entrepreneuriat',
    membersCount: 305,
    description:
      "Association étudiante qui accompagne les projets entrepreneuriaux et organise des événements business.",
    eventsCount: 11,
  },
  {
    id: 'club-005',
    name: 'Robotics Club ESI',
    university: "École nationale Supérieure d'Informatique",
    city: 'Alger',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=RoboticsESI',
    category: 'Robotique',
    membersCount: 180,
    description:
      "Club de robotique et systèmes embarqués, organisateur du concours national annuel.",
    eventsCount: 5,
  },
];

export const getClubById = (id) => CLUBS.find((c) => c.id === id);

// --- Mutateurs mock (CRUD en mémoire, à remplacer par clubService -> API) ---

export const addClub = (clubData) => {
  const newClub = {
    id: `club-${Date.now()}`,
    membersCount: Number(clubData.membersCount) || 0,
    eventsCount: 0,
    logo:
      clubData.logo ||
      `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(
        clubData.name || 'Club'
      )}`,
    ...clubData,
  };
  CLUBS.push(newClub);
  return newClub;
};

export const updateClub = (id, updates) => {
  const index = CLUBS.findIndex((c) => c.id === id);
  if (index === -1) return null;
  CLUBS[index] = { ...CLUBS[index], ...updates };
  return CLUBS[index];
};

export const deleteClub = (id) => {
  const index = CLUBS.findIndex((c) => c.id === id);
  if (index === -1) return false;
  CLUBS.splice(index, 1);
  return true;
};
