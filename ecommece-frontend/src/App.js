import './App.css';

function App() {
  return (
    <div className="App">
      <div className="slidebar"></div>
      <form className="login-form">
        <div className="form-header">
          <h1>Welcome to the EShoply</h1>
        </div>
        <div className="background">
          <ul className="bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
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

        <button type="submit" className="login-btn">Login</button>

        <div className="form-footer">
          <p>Don't have an account? 
          </p>
        </div>
      </form>
    </div>
  );
}


export default App;
