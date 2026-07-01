import { CalendarDays, Tags, Users, Ticket } from 'lucide-react';
import Card from '../../components/common/Card';
import AdminPageHeader from './AdminPageHeader';
import { EVENTS } from '../../data/events';
import { CLUBS } from '../../data/clubs';
import { USERS } from '../../data/users';

const Dashboard = () => {
  const totalSeats = EVENTS.reduce((sum, e) => sum + e.seatsTotal, 0);
  const seatsBooked = EVENTS.reduce(
    (sum, e) => sum + (e.seatsTotal - e.seatsAvailable),
    0
  );
  const fillRate = totalSeats ? Math.round((seatsBooked / totalSeats) * 100) : 0;

  const stats = [
    { label: 'Événements publiés', value: EVENTS.length, icon: CalendarDays },
    { label: 'Clubs partenaires', value: CLUBS.length, icon: Tags },
    { label: 'Étudiants inscrits', value: USERS.length, icon: Users },
    { label: 'Taux de remplissage moyen', value: `${fillRate}%`, icon: Ticket },
  ];

  const upcomingEvents = [...EVENTS]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Vue d'ensemble de l'activité sur UniHub DZ."
      />

      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} padding="lg" className="flex flex-col gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/8 text-primary">
              <stat.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <strong className="font-display text-[1.8rem] text-title">{stat.value}</strong>
            <span className="text-[0.82rem] text-text-muted">{stat.label}</span>
          </Card>
        ))}
      </div>

      <Card padding="lg">
        <h2 className="mb-4.5 text-[1.1rem]">Prochains événements</h2>
        <ul className="flex flex-col gap-1">
          {upcomingEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between border-b border-border py-3.5 last:border-none"
            >
              <div className="flex flex-col gap-0.5">
                <strong className="text-[0.9rem] text-title">{event.title}</strong>
                <span className="text-[0.8rem] text-text-muted">
                  {event.clubName} · {event.city}
                </span>
              </div>
              <span className="text-[0.8rem] font-bold text-primary">
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;