import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFound = () => (
  <section className="py-30">
    <div className="container flex flex-col items-center gap-2.5 text-center">
      <span className="font-display text-[4rem] font-extrabold text-primary">404</span>
      <h1>Page introuvable</h1>
      <p className="mb-4">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <Link to="/">
        <Button variant="primary">Retour à l&apos;accueil</Button>
      </Link>
    </div>
  </section>
);

export default NotFound;
