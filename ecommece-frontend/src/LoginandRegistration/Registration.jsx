import './Registration.css';
import { useState } from 'react';
import { motion } from "motion/react";

function Registration({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address:'',
    phonenumber:'',
    Role:''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const cloudinaryImageUrl = 'https://res.cloudinary.com/dttczxa2i/image/upload/ChatGPT_Image_Jan_12_2026_09_32_37_PM_tyycuu';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          onNavigateToLogin();
        }, 2000);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="background">
        <div className="custom-shape-divider-bottom-1768300002">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>
        <div className="form-header">
          <h1>Create Account</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            id="name" 
            name="name" 
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            id="email" 
            name="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p className="form-message">{message}</p>}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="form-footer">
          <p>Already have an account? <span onClick={onNavigateToLogin} style={{cursor: 'pointer', color: '#007bff', textDecoration: 'underline'}}>Login here</span></p>
        </div>
      </form>
    </>
  );
}
export default Registration;