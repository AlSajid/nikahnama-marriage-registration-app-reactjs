import React, { useEffect } from 'react';
import { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import app from '../Firebase/firebase.config.js';


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({ displayName: 'Neo' });
    const [loading, setLoading] = useState(true);
    const userSignUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = profile => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('Auth state changed ', currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const logOut = () => signOut(auth);

    const authInfo = { user, loading, userSignUp, userSignIn, googleSignIn, updateUserProfile, logOut };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;