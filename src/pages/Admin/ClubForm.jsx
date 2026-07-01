import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { getClubById, addClub, updateClub } from '../../data/clubs';
import { CITIES } from '../../utils/constants';

const EMPTY_FORM = {
  name: '',
  university: '',
  city: '',
  category: '',
  membersCount: 0,
  logo: '',
  description: '',
};

const ClubForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const existingClub = isEditMode ? getClubById(id) : null;

  const [form, setForm] = useState(() =>
    existingClub ? { ...EMPTY_FORM, ...existingClub } : EMPTY_FORM
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, membersCount: Number(form.membersCount) || 0 };

    if (isEditMode) {
      updateClub(existingClub.id, payload);
    } else {
      addClub(payload);
    }

    navigate('/admin/clubs');
  };

  return (
    <div>
      <Link
        to="/admin/clubs"
        className="mb-3.5 inline-block text-[0.85rem] font-semibold text-text hover:text-primary"
      >
        ← Retour aux clubs
      </Link>

      <h1 className="mb-5 text-[1.5rem]">
        {isEditMode ? 'Modifier le club' : 'Nouveau club'}
      </h1>

      <Card padding="lg" className="max-w-[720px]">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nom du club"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Université / établissement"
            name="university"
            value={form.university}
            onChange={handleChange}
            required
          />

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
            <Input
              label="Catégorie"
              name="category"
              placeholder="Tech, Design, Entrepreneuriat..."
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Nombre de membres"
            type="number"
            min="0"
            name="membersCount"
            value={form.membersCount}
            onChange={handleChange}
          />

          <Input
            label="Logo (URL)"
            name="logo"
            placeholder="https://..."
            value={form.logo}
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
              {isEditMode ? 'Enregistrer les modifications' : 'Créer le club'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ClubForm;
