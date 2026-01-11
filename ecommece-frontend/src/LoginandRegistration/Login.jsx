import './Login.css';

function Login() {
  const cloudinaryImageUrl = 'https://res.cloudinary.com/dttczxa2i/image/upload/2148688560_2_pmhwdx';

  return (
    <>
    <div className="background">
      <div class="custom-shape-divider-bottom-1768175439">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
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
      </div>
    </>
  );
}

export default Login;
