import { createContext, useEffect, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect
} from "firebase/auth";
import { auth } from "../.env/firebase";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const  [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in with email and pw
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Sign in using a redirect.
  // const provider = new GoogleAuthProvider();
  // Start a sign in process for an unauthenticated user.
  // provider.addScope('profile');
  // provider.addScope('email');
  // await signInWithRedirect(auth, provider);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("currentUser", currentUser);
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    };
  }, [])

  return <UserContext.Provider value={{ createUser, user, logout, login }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
