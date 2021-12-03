import React, {createContext, useContext, useState} from 'react';
import * as Google from 'expo-google-app-auth';
import {auth} from '../services/firebase';
import {GoogleAuthProvider,
onAuthStateChanged,
signInWithCredential,
signOut,
} from '@firebase/auth';

const AuthContext = createContext({});
const [error, setError] = useState(null);
const [user, setUser] = useState(null);
const [loadingInitial, setLoadingInitial] = useState(true);
const [loading, setLoading] = useState(false);

const config = {
    androidClientId: '744969732254-ak5031out5lnd9limad27796g6uh8t9p.apps.googleusercontent.com',
    iosClientId: '744969732254-iaot86ot9b11rroarmuc5hf0uhnr5e1v.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({children}) => {
    
const logout = () => {
setLoading(true);

signOut(auth)
.catch(error => setError(error))
.finally(() => setLoading(false));
};

const signInWithGoogle = async() => {
    setLoading(true);

    await Google.logInAsync(config).then(async (logInResult) => {
        if(logInResult.type === 'success') {
            // login...
            const { idToken, accessToken } = logInResult;
            const credential = GoogleAuthProvider.credential(idToken, accessToken);

            await signInWithCredential(auth,credential);
        }

        return Promise.reject();

    })
    .catch(error => setError(error))
    .finally(() => setLoading(false)); 
};

const memoValue = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
}),[user, loading, error])

useEffect(() => 
    onAuthStateChanged(auth, (user) => {
        if (user) {
           setUser(user);
        }else {
            setUser(null);
        }
         setLoadingInitial(false);
    }), 
    []
    );

    return (
        <AuthContext.Provider 
        value={{memoValue}}
        >
          {!loadingInitial && children}    

        </AuthContext.Provider>
    );
    };

export default function useAuth() {
    return useContext(AuthContext);
}

