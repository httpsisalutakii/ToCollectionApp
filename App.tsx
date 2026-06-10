import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { initDatabase } from './src/database/init';
import { AuthContext } from './src/context/AuthContext';
import AppNavigator from './src/routes';

initDatabase();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}