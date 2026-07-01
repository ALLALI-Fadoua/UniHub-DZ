import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Badge from '../../components/ui/Badge';
import { getFeaturedEvents, EVENT_CATEGORIES } from '../../data/events';
import { CITIES } from '../../utils/constants';

const CATEGORY_BADGE_VARIANT = {
  hackathon: 'accent',
  conference: 'primary',
  workshop: 'warning',
  fair: 'neutral',
  competition: 'danger',
  training: 'primary',
};

const CARD_TRANSFORM = {
  1: 'rotate-[-6deg] translate-x-[-26px] translate-y-[18px] z-[1] animate-card-in-1',
  2: 'rotate-[3deg] translate-x-[22px] translate-y-[-6px] z-[2] animate-card-in-2',
  3: 'translate-y-[28px] scale-[1.02] z-[3] shadow-[var(--shadow-lg),0_18px_40px_rgba(15,23,42,0.18)] animate-card-in-3',
};

const formatShortDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  });

const Hero = () => {
  const previewEvents = getFeaturedEvents().slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-title py-20 sm:py-24">
      {/* Dégradés radiaux d'ambiance */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_900px_500px_at_85%_-10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(ellipse_900px_600px_at_-10%_10%,rgba(37,99,235,0.18),transparent_60%)]"
      />
      {/* Grille de points qui s'estompe vers le bas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:22px_22px] [mask-image:linear-gradient(180deg,black,transparent_75%)]"
      />

      <div className="container relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 pl-3 text-[0.8rem] font-semibold text-white shadow-sm">
            <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_0_3px_rgba(16,185,129,0.18)]" />
            La vie universitaire algérienne, au même endroit
          </span>

          <h1 className="mb-5 text-[clamp(2.1rem,4vw,3.1rem)] leading-[1.12] tracking-tight">
            <span className="text-white" style={{ color: '#FFFFFF' }}>Ne ratez plus aucun</span>
            <span className="text-accent"> événement scientifique</span>
            <span className="text-white" style={{ color: '#FFFFFF' }}> de votre université.</span>
          </h1>

          <p className="mb-7 max-w-[520px] text-[1.05rem] text-[#CBD5E1]">
            UniHub DZ centralise les conférences, hackathons, ateliers,
            salons et formations organisés par les clubs et établissements
            d&apos;enseignement supérieur à travers l&apos;Algérie.
          </p>

          <div className="mb-8 flex flex-wrap gap-3.5">
            <Link to="/events">
              <Button variant="primary" size="lg">
                Explorer les événements
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg">
                Créer un compte étudiant
              </Button>
            </Link>
          </div>

          <div className="mb-7 flex flex-col gap-2 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:gap-3.5">
            <span className="flex-shrink-0 text-[0.76rem] font-bold uppercase tracking-wide text-[#94A3B8]">
              Présent à
            </span>
            <div className="flex flex-wrap gap-x-4.5 gap-y-2">
              {CITIES.map((city) => (
                <span key={city.value} className="text-[0.86rem] font-semibold text-[#CBD5E1]">
                  {city.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-9">
            <div className="flex flex-col">
              <strong className="font-display text-[1.55rem] font-extrabold text-white">120+</strong>
              <span className="text-[0.8rem] text-[#94A3B8]">Événements publiés</span>
            </div>
            <div className="flex flex-col">
              <strong className="font-display text-[1.55rem] font-extrabold text-white">45</strong>
              <span className="text-[0.8rem] text-[#94A3B8]">Clubs &amp; universités</span>
            </div>
            <div className="flex flex-col">
              <strong className="font-display text-[1.55rem] font-extrabold text-white">15&nbsp;000+</strong>
              <span className="text-[0.8rem] text-[#94A3B8]">Étudiants inscrits</span>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[280px] flex-col items-center justify-center lg:min-h-[420px]">
          <div className="relative h-[280px] w-full max-w-[300px] lg:h-[360px]">
            {previewEvents.map((event, index) => (
              <div
                key={event.id}
                className={`absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-border bg-card opacity-0 shadow-lg ${
                  CARD_TRANSFORM[index + 1]
                }`}
              >
                <div className="relative flex-1 bg-gray-200">
                  <img
                    src={event.cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="absolute left-2.5 top-2.5">
                    <Badge variant={CATEGORY_BADGE_VARIANT[event.category] ?? 'neutral'}>
                      {EVENT_CATEGORIES.find((c) => c.value === event.category)?.label}
                    </Badge>
                  </span>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-1 p-4">
                  <span className="text-[0.72rem] font-bold uppercase tracking-wide text-primary">
                    {formatShortDate(event.date)} · {event.city}
                  </span>
                  <strong className="text-[0.92rem] leading-tight text-title">
                    {event.title}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.78rem] font-semibold text-[#CBD5E1] shadow-sm">
            <span className="h-[7px] w-[7px] rounded-full bg-accent animate-pulse-dot" />
            Mis à jour en continu par les clubs
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;