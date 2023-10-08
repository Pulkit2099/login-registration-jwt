import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
  
    const userCredentials = {
      username: formData.username,
      password: formData.password,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userCredentials);
  
      if (response.status === 200) {
        // Login successful, store the token and redirect to user dashboard
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Show a success toast
        toast.success('Login successful!', { position: 'top-center' });
  
        // Redirect to user dashboard after a short delay (optional)
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        // Handle login failure here
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="login-container"> {/* Apply styles to this container */}
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  
  );
};

export default Login;
