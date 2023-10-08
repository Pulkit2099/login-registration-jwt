import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/register.css';


const Register = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const newUser = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/register', newUser);

      if (response.status === 201) {
        // Registration successful, show a toast message and redirect to the login page
        toast.success('Registration successful!', { position: 'top-center' });
        setTimeout(() => {
          navigate('/login');
        }, 2500); // Redirect to the login page
      } else {
        // Registration failed, handle the error.
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
        <div className="registration-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link> {/* Add the login link */}
      </p>
      </div>
    </div>
    </>

  );
};

export default Register;
