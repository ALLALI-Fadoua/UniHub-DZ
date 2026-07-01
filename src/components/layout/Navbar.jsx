import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Événements', to: '/events' },
  { label: 'Clubs', to: '/clubs' },
  { label: 'À propos', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

const navLinkClasses = ({ isActive }) =>
  [
    'relative pb-1 text-[0.92rem] font-semibold transition-colors duration-150',
    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))] after:transition-[right] after:duration-200 after:content-['']",
    isActive
      ? 'text-accent after:right-0'
      : 'text-[#CBD5E1] after:right-full hover:text-accent hover:after:right-0',
  ].join(' ');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isAdmin, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderAuthActions = (fullWidth = false) => {
    if (isAdmin) {
      return (
        <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>
          <Button variant="primary" size="sm" fullWidth={fullWidth}>
            Dashboard admin
          </Button>
        </Link>
      );
    }

    if (isAuthenticated) {
      return (
        <>
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" size="sm" fullWidth={fullWidth}>
              {user?.fullName?.split(' ')[0] || 'Mon profil'}
            </Button>
          </Link>
          <Link to="/logout" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="sm" fullWidth={fullWidth}>
              Déconnexion
            </Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" size="sm" fullWidth={fullWidth}>
            Connexion
          </Button>
        </Link>
        <Link to="/signup" onClick={() => setIsOpen(false)}>
          <Button variant="primary" size="sm" fullWidth={fullWidth}>
            S&apos;inscrire
          </Button>
        </Link>
      </>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--nav-height)] backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-200 ${
        isScrolled
          ? 'border-b border-white/10 bg-title/95 shadow-[0_2px_16px_rgba(15,23,42,0.25)]'
          : 'border-b border-transparent bg-title'
      }`}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logo}
            alt="UniHub DZ"
            className="h-[38px] w-[38px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-white">
            UniHub <span className="text-accent">DZ</span>
          </span>
        </Link>

        <nav
          className={`fixed inset-x-0 top-[var(--nav-height)] z-40 flex flex-col items-stretch gap-1 border-b border-white/10 bg-title px-6 pb-6 pt-4 shadow-md transition-[opacity,transform] duration-200 lg:static lg:z-auto lg:flex-row lg:items-center lg:gap-7 lg:border-none lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:opacity-100 lg:shadow-none ${
            isOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0 lg:pointer-events-auto lg:translate-y-0'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-3 flex flex-col gap-2.5 lg:hidden">
            {renderAuthActions(true)}
          </div>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          {renderAuthActions()}
        </div>

        <button
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-full rounded-full bg-white" />
          <span className="block h-0.5 w-full rounded-full bg-white" />
          <span className="block h-0.5 w-full rounded-full bg-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;