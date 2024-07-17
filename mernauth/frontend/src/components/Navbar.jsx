import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
