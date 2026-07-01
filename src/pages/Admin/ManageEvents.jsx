import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/common/Modal';
import AdminPageHeader from './AdminPageHeader';
import {
  AdminTableWrapper,
  AdminTable,
  AdminTableHeadCell,
  AdminTableCell,
  AdminTableTitleCell,
  AdminTableThumb,
  AdminTableActions,
  AdminTableIconButton,
  AdminTableEmpty,
  adminTableIconLinkClass,
} from './AdminTable';
import { EVENTS, EVENT_CATEGORIES, deleteEvent } from '../../data/events';

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const ManageEvents = () => {
  const [events, setEvents] = useState(() => [...EVENTS]);
  const [search, setSearch] = useState('');
  const [eventToDelete, setEventToDelete] = useState(null);

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return events;
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.clubName.toLowerCase().includes(term)
    );
  }, [events, search]);

  const handleDelete = () => {
    if (!eventToDelete) return;
    deleteEvent(eventToDelete.id);
    setEvents([...EVENTS]);
    setEventToDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Événements"
        subtitle={`${events.length} événement${events.length > 1 ? 's' : ''} publié${
          events.length > 1 ? 's' : ''
        }`}
        action={
          <Link to="/admin/events/new">
            <Button variant="primary">+ Nouvel événement</Button>
          </Link>
        }
      />

      <div className="mb-5 max-w-[320px]">
        <Input
          name="search"
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AdminTableWrapper>
        {filteredEvents.length ? (
          <AdminTable>
            <thead>
              <tr>
                <AdminTableHeadCell>Événement</AdminTableHeadCell>
                <AdminTableHeadCell>Catégorie</AdminTableHeadCell>
                <AdminTableHeadCell>Date</AdminTableHeadCell>
                <AdminTableHeadCell>Ville</AdminTableHeadCell>
                <AdminTableHeadCell>Places</AdminTableHeadCell>
                <AdminTableHeadCell></AdminTableHeadCell>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <AdminTableTitleCell thumb={<AdminTableThumb src={event.cover} alt={event.title} />}>
                    {event.title}
                  </AdminTableTitleCell>
                  <AdminTableCell>
                    <Badge variant="primary">
                      {EVENT_CATEGORIES.find((c) => c.value === event.category)?.label ??
                        event.category}
                    </Badge>
                  </AdminTableCell>
                  <AdminTableCell>{formatDate(event.date)}</AdminTableCell>
                  <AdminTableCell>{event.city}</AdminTableCell>
                  <AdminTableCell>
                    {event.seatsAvailable} / {event.seatsTotal}
                  </AdminTableCell>
                  <AdminTableActions>
                    <Link
                      to={`/admin/events/${event.id}/edit`}
                      className={adminTableIconLinkClass}
                      title="Modifier"
                    >
                      <Pencil className="h-4 w-4" strokeWidth={2} />
                    </Link>
                    <AdminTableIconButton
                      danger
                      title="Supprimer"
                      onClick={() => setEventToDelete(event)}
                    >
                      <Trash2 className="h-4 w-4 text-danger" strokeWidth={2} />
                    </AdminTableIconButton>
                  </AdminTableActions>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        ) : (
          <AdminTableEmpty>Aucun événement trouvé.</AdminTableEmpty>
        )}
      </AdminTableWrapper>

      <Modal
        isOpen={!!eventToDelete}
        title="Supprimer l'événement"
        variant="danger"
        confirmLabel="Supprimer"
        onClose={() => setEventToDelete(null)}
        onConfirm={handleDelete}
      >
        Êtes-vous sûr de vouloir supprimer{' '}
        <strong>{eventToDelete?.title}</strong> ? Cette action est
        irréversible.
      </Modal>
    </div>
  );
};

export default ManageEvents;