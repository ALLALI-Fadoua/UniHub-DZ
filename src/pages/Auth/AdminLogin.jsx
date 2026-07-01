import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin = () => {
  const { adminLogin, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(form.email, form.password);
      navigate('/admin/dashboard', { replace: true });
    } catch {
      // Erreur déjà exposée via useAuth().error
    }
  };

  return (
    <AuthLayout
      title="Espace administrateur"
      subtitle="Accès réservé à l'équipe UniHub DZ."
    >
      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Adresse e-mail"
          type="email"
          name="email"
          placeholder="admin@unihubdz.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Connexion...' : 'Accéder au dashboard'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default AdminLogin;
