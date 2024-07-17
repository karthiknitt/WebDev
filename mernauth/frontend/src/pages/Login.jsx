import React from 'react';
import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
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
      <button>Log In</button>
    </form>
  );
};

export default Login;
