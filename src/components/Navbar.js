import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate('/login');
    window.location.reload(); // optional: ensures re-rendering everything
  };

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: 'rgba(63, 71, 84, 0.50)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.1)'
    }}>
      <div
        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        BigPhoto
      </div>

      <div>
        {currentUser ? (
          <>
            <button
              style={buttonStyle}
              onClick={() => navigate('/createPost')}
            >
              + New Post
            </button>
            <button
              style={{ ...buttonStyle, marginLeft: '12px' }}
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
            <button
              style={{ ...buttonStyle, marginLeft: '12px', backgroundColor: '#ffdddd' }}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              style={buttonStyle}
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
            <button
              style={{ ...buttonStyle, marginLeft: '12px' }}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer'
};

export default Navbar;
