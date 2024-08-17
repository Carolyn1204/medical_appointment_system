import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css"


const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3007/login', {
        username,
        password,
        role,
      });

      if (response.data.status === 0) {

        localStorage.setItem('userData', JSON.stringify(response.data));


        navigate('/patient/profile');

      } else if (response.data.status === 2) {

        localStorage.setItem('userData', JSON.stringify(response.data));
        navigate('/doctor/appointment');
      } else {
        alert('Login failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };



  return (
    <div className="container">
      <div className="left-side">

      </div>
      <div className="right-side">
        <h1>Welcome to JAC Medical System</h1>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="patient"
                checked={role === 'patient'}
                onChange={(e) => setRole(e.target.value)}
              />
              &nbsp;&nbsp;Patient
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === 'doctor'}
                onChange={(e) => setRole(e.target.value)}
              />
              &nbsp;&nbsp;Doctor
            </label>
          </div>


          <button type="button" onClick={handleSubmit}>Login</button>
        </form>
        <Link to="/register">No Account? Register Now!</Link>
      </div>
    </div>
  );
};

export default LoginPage;