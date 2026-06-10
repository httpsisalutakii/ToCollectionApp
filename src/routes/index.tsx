import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/Login';
import PokemonListScreen from '../pages/PokemonList';
import PokemonDetailScreen from '../pages/PokemonDetail';
import PokemonCameraScreen from '../pages/PokemonCamera';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
    Login: undefined;
    PokemonList: undefined;
    PokemonDetail: {id: number};
    PokemonCamera: {id: number};
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Login" component={LoginScreen}/>
            ) : (
                <>
                    <Stack.Screen name="PokemonList" component={PokemonListScreen}/>
                    <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen}/>
                    <Stack.Screen name="PokemonCamera" component={PokemonCameraScreen}/>
                </>
            )}
        </Stack.Navigator>
    )
}