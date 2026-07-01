import { createContext } from 'react';

// Séparé de AuthContext.jsx pour que ce dernier n'exporte QUE des composants
// (contrainte de React Fast Refresh / eslint-plugin-react-refresh).
export const AuthContext = createContext(null);