import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Button,
     SafeAreaView,
      TouchableOpacity,
        Image,
        StyleSheet,
    } from 'react-native';
    import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionics} from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { collection, doc, getDocs, onSnapshot, setDoc, where } from '@firebase/firestore';
import { db } from '../services/firebase';

const HomeScreen = () => {
const navigation = useNavigation();
const {user, logout} = useAuth();
const [profiles, setProfiles] = useState([]);
const swipeRef = useRef(null);

useLayoutEffect(() => 
onSnapshot(doc(db, "users", user.uid), (snapshot) => {
    if(!snapshot.exists()) {
        navigation.navigate("Modal");
    } 
    }),
    []
 );

 useEffect(() => {
     let unsub;

    const fetchCards = async () => {
     const passes = getDocs(collection(db, "users", user.uid, "passes")).then(
         (snapshot) => snapshot.docs.map((doc) => doc.id)
     );

     const swipes = getDocs(collection(db, "users", user.uid, "swipes")).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
    );

     const passedUserIds = passes.length > 0 ? passes : ['test'];
     const passedUserIds = swipes.length > 0 ? swipes : ['test'];

     
         unsub = onSnapshot
         (query(
             collection(db, "users"),
             where("id", "not-in", [...passedUserIds, ...swipedUserIds])
         ),
             (snapshot) => {
             setProfiles(
                 snapshot.docs.map((doc) => ({
                     id: doc.id,
                     ...doc.data(),
                 }))
             );
           }
         );
     };


 fetchCards();
 return unsub;
}, []);

const swipeLeft = (carIndex) => {
if(!profiles[cardIndex]) return;

const userSwiped = profiles[carIndex];
console.log(`You swiped PASS on ${userSwiped.displayName}`);

setDoc(doc(db, "user", user.id, "passes", userSwiped.id),
userSwiped);
};

const swipeRight = async (cardIndex) => {
    if(!profiles[cardIndex]) return;

    const userSwiped = profiles[carIndex];
    
    console.log(
        `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
    );
    setDoc(
        doc(db, "user", user.uid, "swipes", userSwiped.id),
        userSwiped
    );
};


 return (
 <SafeAreaView style={tw("flex-1")}>
     <View style={tw( "items-center relative")}>
         <TouchableOpacity style={tw("absolute left-5 top-3")} onPress={logout}>
             <Image 
             style={tw("h-10 w-10 rounded-full")} 
             source={{ uri: user.photoURL}}/>
         </TouchableOpacity>

     <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
         <Image style={tw( "h-14 w-14")} source={require('../assets/tinder.png')}/>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
         <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864"/>
     </TouchableOpacity>

     </View>

<View style={tw( "flex-1 mt-6")}>
<Swiper
ref={swipeRef}
containerStyle={{backgroundColor: 'transparent'}}
 cards={profiles} 
 stackSize={5}
 cardIndex={0}
 animateCardOpacity
 verticalSwipe={false}
 onSwipedLeft={(cardIndex) => {
     console.log('Swipe PASS');
     swipeLeft(cardIndex);
 }}
 onSwipedRight={(cardIndex) => {
     console.log('Swipe MATCH');
     swipeRight(cardIndex);
 }}
 backgroundColor={"#4fd0e9"}
 overlayLabels={{
     left: {
         title: "NOPE",
         style: {
             label: {
                 textAlign: "right",
                 color: "red",
             },
         },
     },
     right: {
        title: "MATCH",
        style: {
            label: {
                color: "#4ded30",
            },
        },
    },
 }}
renderCard={(card) => card ? (
    <View style={tw("relative bg-white h-3/4 rounded-xl")}>
        <Image style={tw("absolute top-0 h-full w-full rounded-xl")} source={{uri: card.photoURL}}
        />

     <View 
     style={[tw( "absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 h-20 px-6 py-2 rounded-b-xl"),
      styles.cardShadow,]}>
         <View>
             <Text style={tw("text-xl font-bold")}>
                 {card.DisplayName}
                 </Text>
             <Text>{card.job}</Text>
         </View>
          <Text style={tw( "text-2xl font bold")}>{card.age}</Text>
     </View> 
    </View>
) : (
     
    <View style={[tw( "relative bg-white h-3/4 rounded-xl justify-center items-center"
    ),
    styles.cardShadow,
    
    ]}
    >
        <Text style={tw("h-20 w-full")}></Text>

        <Image
        height={100}
        width={100}
        source={{ uri: "https://links.papareact.com/6gb"}}
        />
    </View>
)
}
/>
</View>

<View
 style={tw('flex flex-row justify-evenly')}
 >
    <TouchableOpacity
     onPress={() => swipeRef.current.swipeLeft()}
     style={tw( "items-center justify-center rounded-full w-16 h-16 bg-red-200")}
     >
    <Entypo 
    name="cross"
     size={24}
      color="red"
      />
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => swipeRef.current.swipeRight()}
    style={tw( "items-center justify-center rounded-full w-16 h-16 bg-red-200")}
    >
        <AntDesign
         name="heart"
          size={24}
         color="green"
         />
    </TouchableOpacity>
</View>


 </SafeAreaView>
 );
}

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width:0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    }
})