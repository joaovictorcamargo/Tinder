import { serverTimestamp, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { db } from '../services/firebase';

const Modal = () => {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [image,setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age,setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

const updateUserProfile = () => {
setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    displayName: user.displayName,
    photoURL: image,
    job: job,
    age: age,
    timestamp: serverTimestamp()
})
.then(() => {
    navigation.navigate('Home')
})
.catch(error => {
   alert(error.message);
})
};

    return (
        <View style={tw( "flex-1 items-center pt-1" )}>
            <Image 
            style={tw("h-20 w-full")}
            resizeMode="contain"
            source={{ uri: "https://links.papareact.com/2pf"}}
            />
            <Text style={tw( "text-xl text-gray-500 p-2 font-bold")}>Welcome {user.displayName}</Text>
            <Text style={tw( "text-center p-4 font-bold text-red-400")}>Step 1: The Profile Pic</Text>
            <TextInput
            style={tw("text-center text-xl pb-2")}
            placeholder="Enter a Profile Pic URL"
            value={image}
            onChangeText={setImage}
            />
            <Text style={tw( "text-center p-4 font-bold text-red-400")}>Step 2: The job</Text>
            <TextInput
            style={tw("text-center text-xl pb-2")}
            placeholder="Enter your occupation"
            value={job}
            onChangeText={text}
            />
            <Text style={tw( "text-center p-4 font-bold text-red-400")}>Step 3: The age</Text>
            <TextInput
            style={tw("text-center text-xl pb-2")}
            placeholder="Enter your age"
            maxLength={3}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            />

            <TouchableOpacity
            disabled={incompleteForm}
            style={[tw("w-64 p-3 rounded-xl absolute bottom-10 bg-red-400"), 
                incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
            ]}
            onPress={updateUserProfile}
            >
                <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Modal
