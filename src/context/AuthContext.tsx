import React, { createContext, useContext } from 'react';

type AuthContextValue = {
  signIn: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: false,
});

export function useAuth() {
  return useContext(AuthContext);
}