import { USERS, ADMIN_USER, getUserByEmail } from '../data/users';

const FAKE_DELAY = 500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock — en mode réel, ces fonctions appelleraient l'API (ex: POST /auth/login)
// et stockeraient un vrai token (JWT) au lieu de l'objet user complet.

export const authService = {
  async login(email, password) {
    await wait(FAKE_DELAY);

    if (!password || password.length < 4) {
      throw new Error('Mot de passe incorrect.');
    }

    const user = getUserByEmail(email);
    if (!user) {
      throw new Error('Aucun compte étudiant trouvé avec cet e-mail.');
    }

    return user;
  },

  async adminLogin(email, password) {
    await wait(FAKE_DELAY);

    if (email.toLowerCase() !== ADMIN_USER.email.toLowerCase() || !password) {
      throw new Error('Identifiants administrateur invalides.');
    }

    return ADMIN_USER;
  },

  async signup({ fullName, email, university }) {
    await wait(FAKE_DELAY);

    if (getUserByEmail(email)) {
      throw new Error('Un compte existe déjà avec cet e-mail.');
    }

    // Mock : on ne persiste pas réellement dans USERS (pas de backend ici)
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      university,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        fullName
      )}`,
      registeredEvents: [],
    };

    return newUser;
  },

  async logout() {
    await wait(150);
    return true;
  },
};

// Exporté pour debug/démo uniquement
export const __mockUsers = USERS;
