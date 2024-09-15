import React, { useState } from 'react';
import { auth } from '../Firebase/FirebaseConfig'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import '../Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      toast.success('Sign Up Successful');
      navigate('/login');
    } catch (error) {
      toast.error('Error signing up: ' + error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <h2>Let's Kook</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        
      </form>
    </div>
  );
};

export default SignUp;
