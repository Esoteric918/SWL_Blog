import { createContext, useEffect, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../.env/firebase";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const  [user, setUser] = useState({});

    // set a current user to the state 
    // const currentUser = auth.currentUser;
    // console.log("currentUser", currentUser);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in with email and pw
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // log out of account
  const logout = () => {
    return signOut(auth);
  };

  //create a function creating user name when siging up for an account
  const setDisplayName = (name) => {
    return auth.currentUser.updateProfile({
      displayName: name
    })
  }


  // Sign in using a redirect.
  // const provider = new GoogleAuthProvider();
  // Start a sign in process for an unauthenticated user.
  // provider.addScope('profile');
  // provider.addScope('email');
  // await signInWithRedirect(auth, provider);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    };
  }, [])

  return <UserContext.Provider value={{ createUser, user, logout, login, setDisplayName }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
