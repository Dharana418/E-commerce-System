import './App.css';
import { useState } from 'react';
import Login from './LoginandRegistration/Login';
import Registration from './LoginandRegistration/Registration.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onNavigateToRegister={() => setCurrentPage('register')} />
      ) : (
        <Registration onNavigateToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  );
}


export default App;
