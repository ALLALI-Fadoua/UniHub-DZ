import { Link } from 'react-router-dom';
import { MapPin, Users, CalendarDays } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../ui/Badge';

const ClubCard = ({ club }) => {
  return (
    <Link to={`/clubs/${club.id}`} className="block h-full">
      <Card padding="md" hoverable className="flex h-full flex-col">
        <div className="mb-3.5 flex items-center justify-between">
          <img
            src={club.logo}
            alt={club.name}
            className="h-12 w-12 rounded-md border border-border"
          />
          <Badge variant="primary">{club.category}</Badge>
        </div>
        <h3 className="mb-1 text-[1.05rem]">{club.name}</h3>
        <p className="mb-3 text-[0.82rem] text-text-muted">{club.university}</p>
        <p className="mb-4 flex-1 text-[0.88rem] text-text">{club.description}</p>

        <div className="flex flex-wrap gap-3 border-t border-border pt-3.5 text-[0.78rem] font-semibold text-text">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            {club.city}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            {club.membersCount} membres
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            {club.eventsCount} événements
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default ClubCard;