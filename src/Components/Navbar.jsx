import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Logo.png'
import '../styles/Navbar.css'; 

const Navbar = ({ user, auth }) => {
  return (
    <nav className="navbar">
      <h2 className="logo"><img src={logo} alt="" className='navlogo' /></h2>
      <div className="nav-links">
        <NavLink to="/" className="nav-link"  activeClassName="active">Home</NavLink>
        <NavLink to="/favorites" className="nav-link"  activeClassName="active">Favorites</NavLink>
        {!user ? (
          <>
            <NavLink to="/signup" className='nav-link' activeClassName='active'>Sign Up</NavLink>
            <NavLink to="/login" className='nav-link' activeClassName='active'>Log In</NavLink>
          </>
        ) : (
          <button className="nav-link-logout" activeClassName='active' onClick={() => auth.signOut()}>Log Out</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
