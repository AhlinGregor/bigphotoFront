import './App.css';
import {useNavigate} from 'react-router';

function App() {

  const navigate = useNavigate();
  
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