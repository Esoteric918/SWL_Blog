import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { AuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TheBlog from "./components/TheBlog";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
        <>
          <TheBlog />
          <AuthContextProvider>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/blog" element={<TheBlog />} />
              <Route path="/createPost" element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />

            </Routes>
          </AuthContextProvider>
        </>
      <Footer />
    </>

  );
}

export default App;
