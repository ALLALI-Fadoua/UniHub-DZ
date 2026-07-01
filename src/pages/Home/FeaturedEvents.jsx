import { Link } from 'react-router-dom';
import EventCard from '../../components/events/EventCard';
import Button from '../../components/common/Button';
import { getFeaturedEvents } from '../../data/events';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FeaturedEvents = () => {
  const events = getFeaturedEvents();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-[88px]" ref={ref}>
      <div className="container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-2 block text-[0.8rem] font-bold uppercase tracking-wide text-accent-hover">
              À la une
            </span>
            <h2 className="max-w-[460px] text-[clamp(1.5rem,2.4vw,1.9rem)]">
              Événements mis en avant cette semaine
            </h2>
          </div>
          <Link to="/events">
            <Button variant="outline">Voir tous les événements</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`transition-[opacity,transform] duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
