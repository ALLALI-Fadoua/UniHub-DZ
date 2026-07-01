import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventFilterBar from '../../components/events/EventFilterBar';
import EventList from '../../components/events/EventList';
import { EVENTS } from '../../data/events';

const EMPTY_LOCAL_FILTERS = { search: '', city: '' };

const EventsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState(EMPTY_LOCAL_FILTERS);

  // La catégorie vit dans l'URL (et non dans un state local synchronisé via
  // un effet) : elle reste donc toujours à jour, même si l'utilisateur arrive
  // via un lien différent (ex: Footer) en restant sur /events.
  const category = searchParams.get('category') || '';
  const filters = useMemo(
    () => ({ ...localFilters, category }),
    [localFilters, category]
  );

  const handleFiltersChange = (nextFilters) => {
    const { category: nextCategory, ...rest } = nextFilters;
    setLocalFilters(rest);

    const params = new URLSearchParams(searchParams);
    if (nextCategory) {
      params.set('category', nextCategory);
    } else {
      params.delete('category');
    }
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => {
    setLocalFilters(EMPTY_LOCAL_FILTERS);
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const filteredEvents = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return EVENTS.filter((event) => {
      const matchesSearch =
        !search ||
        event.title.toLowerCase().includes(search) ||
        event.clubName.toLowerCase().includes(search);
      const matchesCategory =
        !filters.category || event.category === filters.category;
      const matchesCity = !filters.city || event.city === filters.city;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [filters]);

  return (
    <section className="py-12 pb-[90px]">
      <div className="container">
        <div className="mb-7">
          <span className="mb-1.5 block text-[0.8rem] font-bold uppercase tracking-wide text-primary">
            Explorer
          </span>
          <h1 className="mb-1.5 text-[1.9rem]">Tous les événements</h1>
          <p className="text-[0.9rem] text-text-muted">
            {filteredEvents.length} événement
            {filteredEvents.length > 1 ? 's' : ''} trouvé
            {filteredEvents.length > 1 ? 's' : ''}
          </p>
        </div>

        <EventFilterBar
          filters={filters}
          onChange={handleFiltersChange}
          onReset={handleReset}
        />

        <EventList
          events={filteredEvents}
          emptyMessage="Aucun événement ne correspond à vos filtres. Essayez d'élargir votre recherche."
        />
      </div>
    </section>
  );
};

export default EventsList;
