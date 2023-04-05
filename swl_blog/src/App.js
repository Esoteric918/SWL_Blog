import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import BlogPost from "./components/BlogPost";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold">SWL Blog Site</h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/blogPost" element={<BlogPost />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
