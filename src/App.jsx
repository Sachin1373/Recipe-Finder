import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/FirebaseConfig'; // Adjust the path as needed
import Home from './Pages/Home';
import RecipeDetail from './Pages/RecipeDetail';
import Navbar from './Components/Navbar';
import Favorites from './Pages/Favorites';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check authentication status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Navbar user={user} auth={auth} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
     
      <ToastContainer /> {/* Include ToastContainer */}
    </Router>
  );
};

export default App;
