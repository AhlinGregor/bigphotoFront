import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar'; // assuming you have one
import api from '../services/api';

function Layout() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("currentUser");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  // window.addEventListener('beforeunload', () => {
  //   localStorage.removeItem('currentUser');
  // });

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Outlet context={{ currentUser }} />
    </>
  );
}

export default Layout;
