import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const FOOTER_LINKS = [
  {
    title: 'Plateforme',
    links: [
      { label: 'Événements', to: '/events' },
      { label: 'Clubs & universités', to: '/clubs' },
      { label: 'À propos', to: '/#about' },
    ],
  },
  {
    title: 'Catégories',
    links: [
      { label: 'Hackathons', to: '/events?category=hackathon' },
      { label: 'Conférences', to: '/events?category=conference' },
      { label: 'Ateliers', to: '/events?category=workshop' },
      { label: 'Formations', to: '/events?category=training' },
    ],
  },
  {
    title: 'Compte',
    links: [
      { label: 'Connexion', to: '/login' },
      { label: 'S\u2019inscrire', to: '/signup' },
      { label: 'Espace admin', to: '/admin/login' },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-title text-[#CBD5E1]">
      <div className="h-0.5 bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_45%,var(--color-accent)_100%)]" />

      <div className="container grid grid-cols-1 gap-8 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]">
        <div className="flex max-w-[300px] flex-col gap-3.5 sm:col-span-2 lg:col-span-1 lg:max-w-[300px]">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-[1.1rem] font-extrabold text-white"
          >
            <img src={logo} alt="UniHub DZ" className="h-[38px] w-[38px] object-contain" />
            <span>
              UniHub <span className="text-accent">DZ</span>
            </span>
          </Link>
          <p className="text-[0.86rem] leading-relaxed text-[#94A3B8]">
            La plateforme qui rassemble tous les événements scientifiques et
            universitaires d&apos;Algérie en un seul endroit.
          </p>
        </div>

        {FOOTER_LINKS.map((section) => (
          <div key={section.title}>
            <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-wider text-white">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-[11px]">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[0.87rem] text-[#94A3B8] transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="flex flex-col gap-[11px]">
            <li>
              <a
                href="mailto:contact@unihubdz.com"
                className="text-[0.87rem] text-[#94A3B8] transition-colors duration-150 hover:text-white"
              >
                contact@unihubdz.com
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[0.87rem] text-[#94A3B8] transition-colors duration-150 hover:text-white"
              >
                Alger, Algérie
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-4.5 text-[0.8rem] text-[#64748B]">
        <p>© {year} UniHub DZ. Tous droits réservés.</p>
        <p className="text-[#64748B]">
          Développé par{' '}
          <a
            href="https://fadoua-allali-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#94A3B8] transition-colors duration-150 hover:text-white"
          >
            Alfa Web
          </a>
        </p>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-white">
            Confidentialité
          </Link>
          <Link to="/terms" className="hover:text-white">
            Conditions d&apos;utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;