import { StatusBar } from 'expo-status-bar';
import React from 'react';
import tw from 'tailwind-rn';
import { AuthProvider } from './src/hooks/useAuth';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './src/StackNavigator';

export default function App() {
  return (
   <NavigationContainer>
     <AuthProvider>
     <StackNavigator/>
     </AuthProvider>
   </NavigationContainer>
  );
}


