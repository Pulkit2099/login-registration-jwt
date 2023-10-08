import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
    
        console.log('Response:', response);
  
        if (response.status === 200) {
          const userData = response.data;
          console.log('User Data:', userData);
          
          // Check if the username field exists in userData
          if (userData && userData.username) {
            const username = userData.username;
            console.log('Username:', username);
            setUserData(userData);
          } else {
            console.error('Username not found in user data');
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleLogout = () => {
    // Implement logout logic here, such as clearing the JWT token from local storage or cookies.
    // After logging out, redirect to the login page.
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          {/* Display other user information here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
