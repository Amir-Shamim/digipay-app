import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4003/api/signup', {
        name,
        email,
        password
      });
      alert(response.data.message);
      navigate('/login'); // Navigate to login page after successful signup
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className='main'>
      <div className='container'>
        <h2>Sign Up</h2>
        <p className='logSignReference'>Already have an account <Link to="/login">Login</Link></p>
        
        <form onSubmit={handleSubmit}>
          <div className='userInput'>
            <input
              placeholder='Name'
              className='textInput'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='userInput'>
            <input
              placeholder='Email'
              className='textInput'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='userInput'>
            <input
              placeholder='Password'
              className='textInput'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className='logSignButton' type="submit">Sign Up</button>
          </div>

          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>

        </form>
      </div>
    </div>
  );
};

export default SignUp;