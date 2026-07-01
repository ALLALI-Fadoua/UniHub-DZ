import { FolderOpen } from 'lucide-react';
import EventCard from './EventCard';

const EventList = ({ events, emptyMessage = 'Aucun événement trouvé.' }) => {
  if (!events.length) {
    return (
      <div className="flex flex-col items-center gap-2.5 py-15 text-center text-text-muted">
        <FolderOpen className="h-8 w-8" strokeWidth={1.5} />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;