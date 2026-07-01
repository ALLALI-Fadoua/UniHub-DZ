import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Badge from '../../components/ui/Badge';
import EventList from '../../components/events/EventList';
import { getClubById } from '../../data/clubs';
import { getEventsByClub } from '../../data/events';

const ClubDetails = () => {
  const { id } = useParams();
  const club = getClubById(id);

  if (!club) {
    return (
      <section className="py-25">
        <div className="container text-center">
          <h2>Club introuvable</h2>
          <p className="mb-4">Ce club n&apos;existe pas ou a été retiré.</p>
          <Link to="/clubs">
            <Button variant="primary">Retour aux clubs</Button>
          </Link>
        </div>
      </section>
    );
  }

  const clubEvents = getEventsByClub(club.id);

  return (
    <section className="py-12 pb-[90px]">
      <div className="container">
        <div className="mb-5 flex items-center gap-5">
          <img
            src={club.logo}
            alt={club.name}
            className="h-19 w-19 rounded-lg border border-border"
          />
          <div>
            <Badge variant="primary">{club.category}</Badge>
            <h1 className="my-2 text-[1.6rem]">{club.name}</h1>
            <p className="text-[0.9rem] text-text-muted">
              {club.university} · {club.city}
            </p>
          </div>
        </div>

        <p className="mb-7 max-w-[720px] text-[0.98rem] text-text">{club.description}</p>

        <div className="mb-9 flex gap-10 border-y border-border py-5.5">
          <div className="flex flex-col">
            <strong className="font-display text-[1.4rem] text-title">{club.membersCount}</strong>
            <span className="text-[0.82rem] text-text-muted">Membres</span>
          </div>
          <div className="flex flex-col">
            <strong className="font-display text-[1.4rem] text-title">{club.eventsCount}</strong>
            <span className="text-[0.82rem] text-text-muted">Événements organisés</span>
          </div>
        </div>

        <h2 className="mb-5 text-[1.25rem]">Événements à venir de ce club</h2>
        <EventList
          events={clubEvents}
          emptyMessage="Ce club n'a pas d'événement publié pour le moment."
        />
      </div>
    </section>
  );
};

export default ClubDetails;
