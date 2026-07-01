import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { EVENT_CATEGORIES } from '../../data/events';
import { CITIES } from '../../utils/constants';

const EventFilterBar = ({ filters, onChange, onReset }) => {
  const handleField = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-8 grid grid-cols-1 items-start gap-3.5 rounded-lg border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto] [&_.mb-4]:mb-0">
      <div>
        <Input
          name="search"
          placeholder="Rechercher un événement, un club..."
          value={filters.search}
          onChange={handleField}
        />
      </div>

      <div>
        <Select
          name="category"
          placeholder="Toutes les catégories"
          options={EVENT_CATEGORIES}
          value={filters.category}
          onChange={handleField}
        />
      </div>

      <div>
        <Select
          name="city"
          placeholder="Toutes les villes"
          options={CITIES}
          value={filters.city}
          onChange={handleField}
        />
      </div>

      <Button variant="ghost" onClick={onReset} type="button">
        Réinitialiser
      </Button>
    </div>
  );
};

export default EventFilterBar;
