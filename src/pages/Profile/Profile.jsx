import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="py-12 pb-[90px]">
      <div className="container">
        <div className="mb-9 flex items-center gap-4.5">
          <img src={user.avatar} alt={user.fullName} className="h-18 w-18 rounded-full border border-border" />
          <div>
            <h1 className="mb-1 text-[1.5rem]">{user.fullName}</h1>
            <p className="text-[0.88rem] text-text-muted">
              {user.email} {user.university ? `· ${user.university}` : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card padding="lg">
            <h2 className="mb-4 text-[1.1rem]">Informations du compte</h2>
            <ul className="flex flex-col gap-3.5">
              {[
                ['Nom complet', user.fullName],
                ['E-mail', user.email],
                ['Université', user.university || '—'],
              ].map(([label, value]) => (
                <li
                  key={label}
                  className="flex justify-between border-b border-border pb-3 text-[0.88rem] last:border-none last:pb-0"
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
          </Card>

          <Card padding="lg">
            <h2 className="mb-4 text-[1.1rem]">Mes événements</h2>
            <p className="mb-4.5 text-[0.88rem] text-text">
              Retrouvez la liste des événements auxquels vous êtes inscrit.
            </p>
            <Link to="/profile/events">
              <Button variant="outline" fullWidth>
                Voir mes inscriptions
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profile;
