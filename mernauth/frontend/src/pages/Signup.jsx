import React from 'react';
import { useState } from 'react';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={e => {
          setEmail(e.target.value);
        }}
        value={email}
      ></input>

      <label>Password:</label>
      <input
        type="password"
        onChange={e => {
          setPassword(e.target.value);
        }}
        value={password}
      ></input>
      <button>Sign Up</button>
    </form>
  );
};

export default Signup;
