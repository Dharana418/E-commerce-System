import './Login.css';
import { useState } from "react";
import registration from'./Registration.jsx'

function Login({ onNavigateToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cloudinaryImageUrl = "https://res.cloudinary.com/dttczxa2i/image/upload/ChatGPT_Image_Jan_12_2026_09_32_37_PM_tyycuu";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: "Login failed" }));
        throw new Error(data.message || "Login failed");
      }
      const data = await res.json();
      console.log("Logged in:", data); 
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="background">
      <div class="custom-shape-divider-bottom-1768234483">
</div>
      <div className="wavy"></div>
    </div>
    <div className="slidebar">
      <img 
          src={cloudinaryImageUrl} 
          alt="EShoply Product" 
          className="slidebar-image"
      />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Welcome to the EShoply</h1>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            id="email" 
            name="email" 
            placeholder="Enter your email"
            value={form.email}
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
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="form-footer">
          <p>Don't have an account?  <h5><u><span className="register-link" onClick={registration} style={{cursor: 'pointer'}}>Register here</span></u></h5></p>
        </div>
      </form>
    
    </>
  );
}

export default Login;
