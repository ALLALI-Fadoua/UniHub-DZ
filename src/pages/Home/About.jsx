import { Search, Target, Handshake } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PILLARS = [
  {
    icon: Search,
    title: 'Centralisé',
    text: "Toutes les opportunités universitaires d'Algérie réunies en un seul endroit, sans suivre des dizaines de pages.",
  },
  {
    icon: Target,
    title: 'Pertinent',
    text: 'Filtrez par ville, catégorie ou club pour ne voir que les événements qui vous concernent vraiment.',
  },
  {
    icon: Handshake,
    title: 'Communautaire',
    text: 'Construit avec les clubs scientifiques et associations étudiantes pour valoriser leur travail.',
  },
];

const About = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="border-y border-border bg-card py-20 sm:py-24" id="about" ref={ref}>
      <div className="container grid grid-cols-1 items-start gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="mb-3 block text-[0.8rem] font-bold uppercase tracking-wide text-primary">
            Pourquoi UniHub DZ
          </span>
          <h2 className="mb-4 text-[clamp(1.5rem,2.2vw,1.85rem)]">
            Une seule plateforme pour toute la vie scientifique étudiante
          </h2>
          <p className="text-[0.98rem] text-text">
            UniHub DZ aide les étudiants à découvrir les conférences,
            hackathons, ateliers, salons et formations organisés par les
            clubs universitaires et les établissements d&apos;enseignement
            supérieur à travers l&apos;Algérie — et facilite leur
            participation à la vie universitaire.
          </p>
        </div>

        <div className="flex flex-col">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`flex items-start gap-5 border-b border-border py-6 transition-[opacity,transform] duration-500 first:pt-0 last:border-none last:pb-0 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                <pillar.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="mb-1 text-[1.02rem]">{pillar.title}</h3>
                <p className="text-[0.88rem] text-text">{pillar.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;