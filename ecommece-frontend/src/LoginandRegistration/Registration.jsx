import './Registration.css';
import { useState } from 'react';

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