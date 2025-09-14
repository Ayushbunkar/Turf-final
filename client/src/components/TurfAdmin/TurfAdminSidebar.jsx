import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Adjusted path (component is inside components/TurfAdmin, context lives at src/context)
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Calendar,
  LogOut,
  Settings,
  Flag,
  Menu,
  X
} from "lucide-react";

export default function TurfAdminSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-green-600 text-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`bg-white shadow-lg fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        collapsed ? "-translate-x-full" : "translate-x-0"
      }`}>
        <div className="flex flex-col h-full">
          {/* Profile section */}
          <div className="bg-green-700 text-white p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-xl font-semibold">
                {user?.name?.charAt(0) || 'T'}
              </div>
              <div>
                <h2 className="font-semibold">{user?.name || 'Turf Admin'}</h2>
                <p className="text-xs text-green-200">Turf Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <NavLink
              to="/turfadmin"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
              onClick={() => setCollapsed(true)}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>

            <NavLink
              to="/turfadmin/turfs"
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
              onClick={() => setCollapsed(true)}
            >
              <Flag className="h-5 w-5 mr-3" />
              Manage Turfs
            </NavLink>

            <NavLink
              to="/turfadmin/bookings"
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
              onClick={() => setCollapsed(true)}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Manage Bookings
            </NavLink>

            <NavLink
              to="/turfadmin/settings"
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
              onClick={() => setCollapsed(true)}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </NavLink>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

