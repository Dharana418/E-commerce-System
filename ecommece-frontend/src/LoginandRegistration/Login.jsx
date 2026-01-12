import './Login.css';

function Login() {
  const cloudinaryImageUrl = 'https://res.cloudinary.com/dttczxa2i/image/upload/2148688560_2_pmhwdx';

  return (
    <>
    <div className="background">
    </div>
    <div className="slidebar">
      <img 
          src={cloudinaryImageUrl} 
          alt="EShoply Product" 
          className="slidebar-image"
      />
      </div>
      <form className="login-form">
        <div className="form-header">
          <h1>Welcome to the EShoply</h1>
        </div>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your email"
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
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <div className="form-footer">
          <p>Don't have an account?  <h5><u><span className="register-link">Register here</span></u></h5></p>
        </div>
      </form>
    
    </>
  );
}

export default Login;
