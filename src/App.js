import './App.css';
import {useNavigate} from 'react-router';
import { useState, useEffect } from 'react';

function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate('/login');
  };
  
  const gotoLogin = async () => {
    navigate(`/login`);
  }

  const gotoRegister = async () => {
    navigate(`/register`);
  }
  



  return (
    <div className="content-container">
      <div className="main-content">
        <h1 className="header-text">
          Welcome to BIGPHOTO
        </h1>
        <div className="login-container">
          <div className="main-login-container">
            <button onClick={() => gotoLogin()}>Login</button>
            <button onClick={() => gotoRegister()}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;