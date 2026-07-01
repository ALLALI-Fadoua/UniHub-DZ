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
import { CLUBS, deleteClub } from '../../data/clubs';

const ManageClubs = () => {
  const [clubs, setClubs] = useState(() => [...CLUBS]);
  const [search, setSearch] = useState('');
  const [clubToDelete, setClubToDelete] = useState(null);

  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return clubs;
    return clubs.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.university.toLowerCase().includes(term)
    );
  }, [clubs, search]);

  const handleDelete = () => {
    if (!clubToDelete) return;
    deleteClub(clubToDelete.id);
    setClubs([...CLUBS]);
    setClubToDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Clubs"
        subtitle={`${clubs.length} club${clubs.length > 1 ? 's' : ''} partenaire${
          clubs.length > 1 ? 's' : ''
        }`}
        action={
          <Link to="/admin/clubs/new">
            <Button variant="primary">+ Nouveau club</Button>
          </Link>
        }
      />

      <div className="mb-5 max-w-[320px]">
        <Input
          name="search"
          placeholder="Rechercher un club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AdminTableWrapper>
        {filteredClubs.length ? (
          <AdminTable>
            <thead>
              <tr>
                <AdminTableHeadCell>Club</AdminTableHeadCell>
                <AdminTableHeadCell>Université</AdminTableHeadCell>
                <AdminTableHeadCell>Ville</AdminTableHeadCell>
                <AdminTableHeadCell>Catégorie</AdminTableHeadCell>
                <AdminTableHeadCell>Membres</AdminTableHeadCell>
                <AdminTableHeadCell></AdminTableHeadCell>
              </tr>
            </thead>
            <tbody>
              {filteredClubs.map((club) => (
                <tr key={club.id}>
                  <AdminTableTitleCell thumb={<AdminTableThumb src={club.logo} alt={club.name} />}>
                    {club.name}
                  </AdminTableTitleCell>
                  <AdminTableCell>{club.university}</AdminTableCell>
                  <AdminTableCell>{club.city}</AdminTableCell>
                  <AdminTableCell>
                    <Badge variant="accent">{club.category}</Badge>
                  </AdminTableCell>
                  <AdminTableCell>{club.membersCount}</AdminTableCell>
                  <AdminTableActions>
                    <Link
                      to={`/admin/clubs/${club.id}/edit`}
                      className={adminTableIconLinkClass}
                      title="Modifier"
                    >
                      <Pencil className="h-4 w-4" strokeWidth={2} />
                    </Link>
                    <AdminTableIconButton
                      danger
                      title="Supprimer"
                      onClick={() => setClubToDelete(club)}
                    >
                      <Trash2 className="h-4 w-4 text-danger" strokeWidth={2} />
                    </AdminTableIconButton>
                  </AdminTableActions>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        ) : (
          <AdminTableEmpty>Aucun club trouvé.</AdminTableEmpty>
        )}
      </AdminTableWrapper>

      <Modal
        isOpen={!!clubToDelete}
        title="Supprimer le club"
        variant="danger"
        confirmLabel="Supprimer"
        onClose={() => setClubToDelete(null)}
        onConfirm={handleDelete}
      >
        Êtes-vous sûr de vouloir supprimer{' '}
        <strong>{clubToDelete?.name}</strong> ? Ses événements existants ne
        seront pas supprimés automatiquement.
      </Modal>
    </div>
  );
};

export default ManageClubs;