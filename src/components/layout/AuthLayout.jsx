import { Link } from 'react-router-dom';
import Card from '../common/Card';
import logo from '../../assets/images/logo.png';

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <section className="flex min-h-[calc(100vh-var(--nav-height))] items-center py-[70px]">
      <div className="container flex justify-center">
        <Card padding="lg" className="w-full max-w-[440px]">
          <Link to="/" className="mb-7 flex items-center gap-2.5 font-display text-[1.05rem] font-extrabold text-title">
            <img src={logo} alt="UniHub DZ" className="h-[34px] w-[34px] object-contain" />
            <span>
              UniHub <span className="text-accent">DZ</span>
            </span>
          </Link>

          <h1 className="mb-1.5 text-[1.4rem]">{title}</h1>
          {subtitle && <p className="mb-6 text-[0.88rem] text-text">{subtitle}</p>}

          {children}

          {footer && (
            <div className="mt-5 border-t border-border pt-4.5 text-center text-[0.85rem] [&_a]:font-semibold [&_a]:text-primary">
              {footer}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default AuthLayout;
