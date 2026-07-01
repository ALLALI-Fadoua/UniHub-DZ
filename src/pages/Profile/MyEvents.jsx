import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../../components/events/EventList';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';

const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    userService.getRegisteredEvents(user).then((result) => {
      if (isMounted) {
        setEvents(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <section className="py-12 pb-[90px]">
      <div className="container">
        <Link to="/profile" className="mb-4.5 inline-block text-[0.85rem] font-semibold text-text hover:text-primary">
          ← Mon profil
        </Link>

        <h1 className="mb-1.5 text-[1.7rem]">Mes événements</h1>
        <p className="mb-7.5 text-[0.9rem] text-text-muted">
          Les événements auxquels vous êtes inscrit(e).
        </p>

        {loading ? (
          <Loader label="Chargement de vos inscriptions..." />
        ) : (
          <EventList
            events={events}
            emptyMessage="Vous n'êtes inscrit(e) à aucun événement pour le moment."
          />
        )}
      </div>
    </section>
  );
};

export default MyEvents;
