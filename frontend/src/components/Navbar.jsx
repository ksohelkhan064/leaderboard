import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaStar } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isProfileOpen, setIsProfileOpen } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Neina
            </Link>
            {user && (
              <>
                <Link to="/" className="text-gray-700 text-lg font-semibold hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/leaderboard" className="text-gray-700 text-lg font-semibold hover:text-blue-600 transition-colors">
                  Leaderboard
                </Link>
              </>
            )}
          </div>
          
          <div className="relative">
            {user ? (
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.data.firstName?.charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 top-10">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
                    <div className="flex items-center mb-2">
                      <FaUser className="text-gray-500 mr-2" />
                      <p className="font-medium">Username: {user.data.firstName.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaEnvelope className="text-gray-500 mr-2" />
                      <p className="font-medium truncate">Email: {user.data.email}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaStar className="text-gray-500 mr-2" />
                      <p className="font-medium">Points: {user.data.Points}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="mt-2 w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-700 text-lg font-semibold hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 text-lg font-semibold hover:text-blue-600 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;