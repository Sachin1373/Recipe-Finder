import React, { useState } from 'react';
import { auth } from '../Firebase/FirebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../Styles/Login.css';

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successful');
    } catch (error) {
      toast.error("Sign Up Please ");
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Log In</h1>
      <h2>Let's Kook</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default Login;
