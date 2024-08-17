import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PatientProfileModel } from '../../models/PatientProfileModel';
import "./RegisterPage.css"

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Create a new instance of PatientProfileModel
  const [formData, setFormData] = useState(new PatientProfileModel(0, '', '', '', '', '', '', '', ''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Use setter methods to update the formData
    switch (name) {
      case 'user_name':
        formData.user_name = value;
        break;
      case 'password':
        formData.password = value;
        break;
      case 'first_name':
        formData.first_name = value;
        break;
      case 'last_name':
        formData.last_name = value;
        break;
      case 'email':
        formData.email = value;
        break;
      case 'phone':
        formData.phone = value;
        break;
      case 'health_insurance_no':
        formData.health_insurance_no = value;
        break;
    }

    // Trigger a state update to re-render the component
    setFormData(new PatientProfileModel(
      formData.patient_id,
      formData.user_name,
      formData.first_name,
      formData.last_name,
      formData.password,
      formData.email,
      formData.phone,
      formData.health_insurance_no,
      'patient'
    ));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Extract formData using getter methods before sending to the server
    const formDataToSend = {
      patient_id: formData.patient_id,
      user_name: formData.user_name,
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      health_insurance_no: formData.health_insurance_no,
      identity: formData.identity
    };


    axios.post('http://127.0.0.1:3007/register', formDataToSend)
      .then(response => {
        if (response.data.status === 0) {
          const userConfirmed = window.confirm('Registration successful! Please login!');
          if (userConfirmed) {
            navigate('/');
          }
        } else {
          console.error('Registration failed:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <div className="container">
      <div className="right-side">
        <h1>Welcome to JAC Medical System</h1>
        <form className="login-form">
          <label htmlFor="user_name">Username</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="first_name">Firstname</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="last_name">Lastname</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="health_insurance_no">Health Insurance No.</label>
          <input
            type="text"
            id="health_insurance_no"
            name="health_insurance_no"
            value={formData.health_insurance_no}
            onChange={handleChange}
          />

          

          <button type="button" onClick={handleSubmit}>Register</button>
        </form>
        <Link to="/">Already have an account? Login Now!</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
