import './App.css';

function App() {
  return (
    <div className="App">
      <div className="slidebar"></div>
      <form className="login-form">
        <label for="username">Username</label><br></br>
        <input type="text" id="username" name="username" placeholder="Enter your username" /><br></br>
        <label for="password">Password</label><br></br>
        <input type="password" id="password" name="password" placeholder="Enter your password" /><br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


export default App;
