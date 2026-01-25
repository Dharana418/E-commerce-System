import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ onNavigateToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const cloudinaryImageUrl =
    "https://res.cloudinary.com/dttczxa2i/image/upload/3d-rendering-cartoon-shopping-cart_sxo3yi.png";

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigateToRegister = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      history.push("/register");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

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
        <div className="slidebar">
          <img
            src={cloudinaryImageUrl}
            alt="Login Visual"
            className="login-image"
          />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Welcome to Eshoply</h1>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="switch-auth">
            Don’t have an account?{" "}
            <span onClick={handleNavigateToRegister}><u>Register</u></span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
