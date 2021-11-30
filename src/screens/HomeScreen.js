import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View,Text,Button} from 'react-native';

import {
 Container
} from './styles';

const HomeScreen = () => {
const navigation = useNavigation();

 return (
 <View>
<Button onPress={() => navigation.navigate("Chat")}
/>
 </View>
 );
}

export default HomeScreen;