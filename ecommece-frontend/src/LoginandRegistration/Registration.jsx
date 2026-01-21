import './Registration.css';
import { useState } from 'react';

function Registration({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phonenumber: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
          password: formData.password,
          address: formData.address,
          phonenumber: formData.phonenumber,
          role: formData.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setFormData({ name: '', email: '', password: '', confirmPassword: '', address: '', phonenumber: '', role: 'customer' });
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
            type="email"
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

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number</label>
          <input 
            type="tel" 
            id="phonenumber" 
            name="phonenumber" 
            placeholder="Enter your phone number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select 
            id="role" 
            name="role" 
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
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