import { useMemo, useState } from 'react';
import Input from '../../components/common/Input';
import ClubCard from '../../components/events/ClubCard';
import { CLUBS } from '../../data/clubs';

const ClubsList = () => {
  const [search, setSearch] = useState('');

  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return CLUBS;

    return CLUBS.filter(
      (club) =>
        club.name.toLowerCase().includes(term) ||
        club.university.toLowerCase().includes(term) ||
        club.city.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <section className="py-12 pb-[90px]">
      <div className="container">
        <div className="mb-7">
          <span className="mb-1.5 block text-[0.8rem] font-bold uppercase tracking-wide text-accent-hover">
            Communauté
          </span>
          <h1 className="mb-2 text-[1.9rem]">Clubs &amp; universités</h1>
          <p className="max-w-[560px] text-[0.92rem] text-text">
            Découvrez les clubs scientifiques et associations étudiantes qui
            organisent les événements de la plateforme.
          </p>
        </div>

        <div className="mb-7.5 max-w-[420px]">
          <Input
            name="search"
            placeholder="Rechercher un club, une université, une ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredClubs.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <p className="py-15 text-center text-text-muted">Aucun club trouvé.</p>
        )}
      </div>
    </section>
  );
};

export default ClubsList;
