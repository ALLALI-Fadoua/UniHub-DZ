import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { EVENT_CATEGORIES } from '../../data/events';

const CATEGORY_BADGE_VARIANT = {
  hackathon: 'accent',
  conference: 'primary',
  workshop: 'warning',
  fair: 'neutral',
  competition: 'danger',
  training: 'primary',
};

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const EventCard = ({ event }) => {
  const categoryLabel =
    EVENT_CATEGORIES.find((c) => c.value === event.category)?.label ??
    event.category;
  const isFull = event.seatsAvailable === 0;

  return (
    <Link to={`/events/${event.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.cover}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_55%,rgba(15,23,42,0.45)_100%)]" />
          <span className="absolute left-3 top-3 z-10">
            <Badge variant={CATEGORY_BADGE_VARIANT[event.category] ?? 'neutral'}>
              {categoryLabel}
            </Badge>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-5">
          <span className="text-xs font-bold uppercase tracking-wide text-primary">
            {formatDate(event.date)}
          </span>
          <h3 className="text-[1.05rem] leading-snug transition-colors duration-150 group-hover:text-primary">
            {event.title}
          </h3>
          <p className="text-sm text-text-muted">
            {event.clubName} · {event.city}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3.5">
            <span className="text-sm font-bold text-title">{event.price}</span>
            <span
              className={`text-xs font-semibold ${
                isFull ? 'text-danger' : 'text-accent-hover'
              }`}
            >
              {isFull ? 'Complet' : `${event.seatsAvailable} places restantes`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
