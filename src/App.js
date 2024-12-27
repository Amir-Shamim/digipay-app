import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='mainContainer'>      
        <nav>
          <ul>
            <li  className='navList'>
              <Link to="/login">Login</Link>
            </li>
            <li  className='navList'>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <div className='container'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
