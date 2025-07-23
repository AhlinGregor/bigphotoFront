import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar'; // assuming you have one

function Layout() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Outlet context={{ currentUser }} />
    </>
  );
}

export default Layout;
