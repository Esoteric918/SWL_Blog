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

function App() {
  return (
    <>
      <div className="App">
        <h1 className="text-center text-3xl font-bold">SWL Blog Site</h1>
        <>
          <TheBlog />
          <AuthContextProvider>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/blog" element={<TheBlog />} />
              <Route path="/CreatePost" element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />

            </Routes>
          </AuthContextProvider>
        </>
      </div>
      <Footer />
    </>

  );
}

export default App;
