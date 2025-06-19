import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Droplet, Home, Guitar as Hospital, UserPlus, Users } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8" />
            <span className="text-xl font-bold">BloodLink</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" isActive={isActive('/')} />
            <NavLink to="/donor-registration" icon={<UserPlus className="h-5 w-5" />} text="Donor Registration" isActive={isActive('/donor-registration')} />
            <NavLink to="/hospital-registration" icon={<Hospital className="h-5 w-5" />} text="Hospital Registration" isActive={isActive('/hospital-registration')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, isActive }: { to: string; icon: React.ReactNode; text: string; isActive: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-red-700' : 'hover:bg-red-500'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}