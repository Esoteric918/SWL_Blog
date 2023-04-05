import { createContext, useEffect, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";


const UserContext = createContext();
// const provider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
    const  [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
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