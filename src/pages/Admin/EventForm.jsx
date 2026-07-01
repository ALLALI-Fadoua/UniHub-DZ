import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import {
  EVENT_CATEGORIES,
  getEventById,
  addEvent,
  updateEvent,
} from '../../data/events';
import { CLUBS } from '../../data/clubs';
import { CITIES, EVENT_MODES } from '../../utils/constants';

const EMPTY_FORM = {
  title: '',
  category: '',
  clubId: '',
  city: '',
  mode: 'Présentiel',
  date: '',
  time: '',
  price: 'Gratuit',
  cover: '',
  seatsTotal: 100,
  description: '',
};

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const existingEvent = isEditMode ? getEventById(id) : null;

  const [form, setForm] = useState(() =>
    existingEvent ? { ...EMPTY_FORM, ...existingEvent } : EMPTY_FORM
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const club = CLUBS.find((c) => c.id === form.clubId);
    const payload = {
      ...form,
      seatsTotal: Number(form.seatsTotal) || 0,
      clubName: club?.name || form.clubName || '',
    };

    if (isEditMode) {
      updateEvent(existingEvent.id, payload);
    } else {
      addEvent(payload);
    }

    navigate('/admin/events');
  };

  return (
    <div>
      <Link
        to="/admin/events"
        className="mb-3.5 inline-block text-[0.85rem] font-semibold text-text hover:text-primary"
      >
        ← Retour aux événements
      </Link>

      <h1 className="mb-5 text-[1.5rem]">
        {isEditMode ? "Modifier l'événement" : 'Nouvel événement'}
      </h1>

      <Card padding="lg" className="max-w-[720px]">
        <form onSubmit={handleSubmit}>
          <Input
            label="Titre de l'événement"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Catégorie"
              name="category"
              placeholder="Choisir une catégorie"
              options={EVENT_CATEGORIES}
              value={form.category}
              onChange={handleChange}
              required
            />
            <Select
              label="Club organisateur"
              name="clubId"
              placeholder="Choisir un club"
              options={CLUBS.map((c) => ({ value: c.id, label: c.name }))}
              value={form.clubId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Ville"
              name="city"
              placeholder="Choisir une ville"
              options={CITIES}
              value={form.city}
              onChange={handleChange}
              required
            />
            <Select
              label="Mode"
              name="mode"
              options={EVENT_MODES}
              value={form.mode}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <Input
              label="Heure"
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Prix"
              name="price"
              placeholder="Gratuit, 500 DA..."
              value={form.price}
              onChange={handleChange}
            />
            <Input
              label="Places totales"
              type="number"
              min="1"
              name="seatsTotal"
              value={form.seatsTotal}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Image de couverture (URL)"
            name="cover"
            placeholder="https://..."
            value={form.cover}
            onChange={handleChange}
          />

          <Input
            label="Description"
            as="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="mt-2 flex justify-end gap-2.5">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Enregistrer les modifications' : "Créer l'événement"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EventForm;
