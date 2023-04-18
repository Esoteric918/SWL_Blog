import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NewBlogPost from "./components/CreatePost";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { AuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold">SWL Blog Site</h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <ProtectedRoute path="/account">
            <Route path="/" element={<Account />} />
            <Route path="/create-post" element={<NewBlogPost />} />
          </ProtectedRoute>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
