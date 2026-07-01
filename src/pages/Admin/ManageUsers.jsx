import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
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
} from './AdminTable';
import { USERS, deleteUser } from '../../data/users';

const ManageUsers = () => {
  const [users, setUsers] = useState(() => [...USERS]);
  const [search, setSearch] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [users, search]);

  const handleDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id);
    setUsers([...USERS]);
    setUserToDelete(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Utilisateurs"
        subtitle={`${users.length} étudiant${users.length > 1 ? 's' : ''} inscrit${
          users.length > 1 ? 's' : ''
        }`}
      />

      <div className="mb-5 max-w-[320px]">
        <Input
          name="search"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AdminTableWrapper>
        {filteredUsers.length ? (
          <AdminTable>
            <thead>
              <tr>
                <AdminTableHeadCell>Utilisateur</AdminTableHeadCell>
                <AdminTableHeadCell>E-mail</AdminTableHeadCell>
                <AdminTableHeadCell>Université</AdminTableHeadCell>
                <AdminTableHeadCell>Rôle</AdminTableHeadCell>
                <AdminTableHeadCell>Inscriptions</AdminTableHeadCell>
                <AdminTableHeadCell></AdminTableHeadCell>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <AdminTableTitleCell
                    thumb={<AdminTableThumb src={user.avatar} alt={user.fullName} rounded="rounded-full" />}
                  >
                    {user.fullName}
                  </AdminTableTitleCell>
                  <AdminTableCell>{user.email}</AdminTableCell>
                  <AdminTableCell>{user.university}</AdminTableCell>
                  <AdminTableCell>
                    <Badge variant="neutral">Étudiant</Badge>
                  </AdminTableCell>
                  <AdminTableCell>{user.registeredEvents?.length ?? 0}</AdminTableCell>
                  <AdminTableActions>
                    <AdminTableIconButton
                      danger
                      title="Supprimer"
                      onClick={() => setUserToDelete(user)}
                    >
                      <Trash2 className="h-4 w-4 text-danger" strokeWidth={2} />
                    </AdminTableIconButton>
                  </AdminTableActions>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        ) : (
          <AdminTableEmpty>Aucun utilisateur trouvé.</AdminTableEmpty>
        )}
      </AdminTableWrapper>

      <Modal
        isOpen={!!userToDelete}
        title="Supprimer l'utilisateur"
        variant="danger"
        confirmLabel="Supprimer"
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
      >
        Êtes-vous sûr de vouloir supprimer le compte de{' '}
        <strong>{userToDelete?.fullName}</strong> ?
      </Modal>
    </div>
  );
};

export default ManageUsers;