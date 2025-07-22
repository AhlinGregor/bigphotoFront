import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: 'rgba(63, 71, 84, 0.50)', // translucent
      backdropFilter: 'blur(8px)', // blur background behind navbar
      WebkitBackdropFilter: 'blur(8px)', // Safari support
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // subtle border
      boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.1)'
      // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      // display: 'flex',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // padding: '12px 24px',
      // backgroundColor: 'rgba(63, 71, 84, 1)',
      // position: 'sticky',
      // top: 0,
      // zIndex: 1000
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        BigPhoto
      </div>
      <div>
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
