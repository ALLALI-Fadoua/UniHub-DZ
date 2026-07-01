// Mock data — à remplacer plus tard par authService.js connecté à une vraie API

export const USERS = [
  {
    id: 'usr-001',
    fullName: 'Amine Belkacem',
    email: 'amine.belkacem@etu.dz',
    role: 'student',
    university: 'USTHB',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Amine%20Belkacem',
    registeredEvents: ['evt-001', 'evt-003'],
  },
  {
    id: 'usr-002',
    fullName: 'Lina Cherif',
    email: 'lina.cherif@etu.dz',
    role: 'student',
    university: 'ENSIA',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lina%20Cherif',
    registeredEvents: ['evt-002'],
  },
];

export const ADMIN_USER = {
  id: 'admin-001',
  fullName: 'Admin UniHub',
  email: 'admin@unihubdz.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin%20UniHub',
};

export const getUserByEmail = (email) =>
  USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

// --- Mutateur mock (CRUD en mémoire, à remplacer par userService -> API) ---

export const deleteUser = (id) => {
  const index = USERS.findIndex((u) => u.id === id);
  if (index === -1) return false;
  USERS.splice(index, 1);
  return true;
};
