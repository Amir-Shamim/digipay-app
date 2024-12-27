import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    const user = { email, password };
    try {
      const response = await axios.post('http://localhost:4003/api/login', user);
      const { upi_id, message, balance } = response.data;
      localStorage.setItem(
        'user',
        JSON.stringify({ email, upi_id, balance })
      );
      alert(message);
      navigate('/transaction'); // Navigate to the transaction page after successful login
      window.location.reload();
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h2>Login</h2>
        <form className='formElement' onSubmit={handleSubmit}>
          <div className='userInput'>
            <input className='textInput emailInput'
              placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='userInput'>
            <input className='textInput passwordInput'
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input id='checkbox' type='checkbox' className='checkBox' />
            <label for="checkbox">Remember me</label>
          </div>
          <div className='button-div'>
            <button className='logSignButton' type="submit">
              Login
            </button>
            <p>Create an account <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
