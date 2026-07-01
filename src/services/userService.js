import { getEventById } from '../data/events';

// Mock — à remplacer par de vrais appels API (ex: GET /users/me/events)

export const userService = {
  async getRegisteredEvents(user) {
    if (!user?.registeredEvents) return [];
    return user.registeredEvents
      .map((eventId) => getEventById(eventId))
      .filter(Boolean);
  },

  async updateProfile(user, updates) {
    return { ...user, ...updates };
  },
};
