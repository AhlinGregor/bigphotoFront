import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // or use any icon library you prefer

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate('/login');
    window.location.reload();
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* App Name - centered on mobile */}
          <div className="flex-1 flex justify-start md:justify-start">
            <div
              className="text-xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              BigPhoto
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <button onClick={() => navigate('/createPost')} className="btn">+ New Post</button>
                <button onClick={() => navigate('/profile')} className="btn">Profile</button>
                <button onClick={handleLogout} className="btn bg-red-200 hover:bg-red-300">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn">Log In</button>
                <button onClick={() => navigate('/register')} className="btn">Register</button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <div className="flex flex-col gap-2 pt-4">
            {currentUser ? (
              <>
                <button onClick={() => { navigate('/createPost'); setMobileMenuOpen(false); }} className="btn w-full">+ New Post</button>
                <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="btn w-full">Profile</button>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn w-full bg-red-200 hover:bg-red-300">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="btn w-full">Log In</button>
                <button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }} className="btn w-full">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
