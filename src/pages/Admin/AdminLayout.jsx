import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Tags, Users } from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

const ADMIN_NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/events', label: 'Événements', icon: CalendarDays },
  { to: '/admin/clubs', label: 'Clubs', icon: Tags },
  { to: '/admin/users', label: 'Utilisateurs', icon: Users },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-[calc(100vh-var(--nav-height))] max-lg:h-auto max-lg:flex-col">
      <Sidebar
        items={ADMIN_NAV_ITEMS}
        header={
          <Link to="/" className="flex items-center gap-2.5 font-display text-[1rem] font-extrabold text-title">
            <img src={logo} alt="UniHub DZ" className="h-8 w-8 object-contain" />
            <span>
              UniHub <span className="text-accent">DZ</span>
            </span>
          </Link>
        }
        footer={
          <div className="flex items-center gap-2.5">
            <img src={user?.avatar} alt={user?.fullName} className="h-9 w-9 rounded-full" />
            <div>
              <strong className="block text-[0.82rem] text-title">{user?.fullName}</strong>
              <button onClick={logout} className="text-[0.76rem] font-semibold text-danger">
                Déconnexion
              </button>
            </div>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto bg-background p-8 max-lg:p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;