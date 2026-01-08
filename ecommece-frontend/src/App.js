import './App.css';

function App() {
  return (
    <div className="App">
      <div className="slidebar"></div>
      <form className="login-form">
        <div className="form-header">
          <h1>Welcome</h1>
          <p>E-Commerce Store</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username"
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

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" name="remember" />
            Remember me
          </label>
          <button 
            type="button" 
            className="forgot-link"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="login-btn">Login</button>

        <div className="form-footer">
          <p>Don't have an account? 
            <button 
              type="button" 
              className="signup-link"
              onClick={(e) => e.preventDefault()}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}


export default App;
