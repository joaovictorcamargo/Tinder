import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth

 return (
 <Stack.Navigator>
     {user ? (
     <>
     <Stack.Screen name="Home" componet={HomeScreen}/>
     <Stack.Screen name="Chat" componet={ChatScreen}/>
     </>
     ) : (
     <Stack.Screen name="Login" componet={LoginScreen}/>
     )}
 </Stack.Navigator>
 );
}