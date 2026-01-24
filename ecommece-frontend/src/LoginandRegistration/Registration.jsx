import './Registration.css';
import { useState } from 'react';

function Registration({ onNavigateToLogin }) {
  const cloudinaryImageUrl = "https://res.cloudinary.com/dttczxa2i/image/upload/3d-rendering-cartoon-shopping-cart_sxo3yi.png";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phonenumber: '',
    role: 'customer'  // safe default
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          phonenumber: formData.phonenumber,
          role: formData.role  // backend should validate this
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: '',
          phonenumber: '',
          role: 'customer'
        });
        setTimeout(() => onNavigateToLogin(), 2000);
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
    <div className="body-registration">
    <div className="registration-background">
      <div className="registration-slidebar">
        <img src={cloudinaryImageUrl} alt="Registration Visual" className="registration-image" />
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-form-header">
          <h1>Create Account</h1>
        </div>

        {message && <div className="registration-form-message">{message}</div>}

        <div className="registration-form-group">
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

        <div className="registration-form-group">
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

        <div className="registration-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>

        <div className="registration-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>

        <div className="registration-form-group">
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

        <div className="registration-form-group">
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            placeholder="07XXXXXXXX"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="registration-form-group">
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
          </select>
        </div>

        <button type="submit" className="registration-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="registration-form-footer">
          <p>
            Already have an account?{' '}
            <span onClick={onNavigateToLogin}>Login here</span>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Registration;
