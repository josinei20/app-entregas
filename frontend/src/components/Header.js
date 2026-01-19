import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import { FaSignOutAlt, FaUser, FaBars, FaHome } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <img 
            src="/images/geotransportes-logo.svg" 
            alt="GeoTransportes Logo" 
            className="h-11 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight">GeoTransportes</h1>
            <p className="text-xs text-purple-100">Logística Rodoviária</p>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm bg-white bg-opacity-15 px-4 py-2 rounded-full">
            <FaUser className="text-purple-200" />
            <span className="font-medium">{user?.name}</span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-purple-500 rounded-lg transition duration-200"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-purple-700 px-4 py-3 border-t border-purple-500 space-y-2">
          <button
            onClick={() => {
              navigate('/home');
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600 transition text-white text-left font-medium"
          >
            <FaHome />
            Início
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600 transition text-white text-left font-medium"
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
