import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Wallet,
  Ticket,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/common/Card';
import { getEventById, EVENT_CATEGORIES, updateEvent } from '../../data/events';
import { getClubById } from '../../data/clubs';
import { useAuth } from '../../hooks/useAuth';

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, registerForEvent } = useAuth();
  const event = getEventById(id);

  if (!event) {
    return (
      <section className="py-25">
        <div className="container text-center">
          <h2>Événement introuvable</h2>
          <p className="mb-4">Cet événement n&apos;existe pas ou a été retiré.</p>
          <Link to="/events">
            <Button variant="primary">Retour aux événements</Button>
          </Link>
        </div>
      </section>
    );
  }

  const club = getClubById(event.clubId);
  const categoryLabel =
    EVENT_CATEGORIES.find((c) => c.value === event.category)?.label ??
    event.category;
  const isRegistered = user?.registeredEvents?.includes(event.id) ?? false;
  const isFull = event.seatsAvailable === 0;

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (isFull || isRegistered) return;

    updateEvent(event.id, {
      seatsAvailable: Math.max(0, event.seatsAvailable - 1),
    });
    registerForEvent(event.id);
  };

  const metaRows = [
    { icon: Calendar, label: 'Date', value: formatDate(event.date) },
    { icon: Clock, label: 'Heure', value: event.time },
    { icon: MapPin, label: 'Ville', value: event.city },
    { icon: Monitor, label: 'Mode', value: event.mode },
    { icon: Wallet, label: 'Prix', value: event.price },
  ];

  return (
    <section>
      <div className="relative h-80 overflow-hidden">
        <img src={event.cover} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.55))]" />
      </div>

      <div className="container py-7 pb-[90px]">
        <button
          className="mb-5 text-[0.85rem] font-semibold text-text hover:text-primary"
          onClick={() => navigate(-1)}
        >
          ← Retour
        </button>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Badge variant="primary">{categoryLabel}</Badge>
            <h1 className="my-3.5 text-[1.9rem]">{event.title}</h1>

            {club && (
              <Link
                to={`/clubs/${club.id}`}
                className="mb-5.5 inline-flex items-center gap-2.5 text-[0.88rem] font-semibold text-text hover:text-primary"
              >
                <img src={club.logo} alt={club.name} className="h-8 w-8 rounded-sm border border-border" />
                <span>Organisé par {club.name}</span>
              </Link>
            )}

            <p className="whitespace-pre-line text-[0.98rem] text-text">{event.description}</p>
          </div>

          <Card padding="lg" className="lg:sticky lg:top-[calc(var(--nav-height)+20px)]">
            <ul className="mb-5.5 flex flex-col gap-3.5">
              {metaRows.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="flex items-center justify-between border-b border-border pb-3 text-[0.88rem] last:border-none last:pb-0"
                >
                  <span className="flex items-center gap-2 text-text-muted">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    {label}
                  </span>
                  <strong>{value}</strong>
                </li>
              ))}
              <li className="flex items-center justify-between text-[0.88rem]">
                <span className="flex items-center gap-2 text-text-muted">
                  <Ticket className="h-4 w-4 text-primary" strokeWidth={2} />
                  Places
                </span>
                <strong className={isFull ? 'text-danger' : ''}>
                  {isFull ? 'Complet' : `${event.seatsAvailable} / ${event.seatsTotal}`}
                </strong>
              </li>
            </ul>

            {isRegistered ? (
              <div className="flex flex-col items-center gap-2 text-center text-[0.88rem] font-semibold text-accent-hover">
                <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                <p>
                  Inscription confirmée ! Retrouvez cet événement dans{' '}
                  <Link to="/profile/events" className="underline">
                    Mes événements
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                size="lg"
                disabled={isFull}
                onClick={handleRegister}
              >
                {isFull
                  ? 'Complet'
                  : isAuthenticated
                  ? "S'inscrire à l'événement"
                  : "Se connecter pour s'inscrire"}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;