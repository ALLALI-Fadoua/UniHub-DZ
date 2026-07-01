import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const Signup = () => {
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    university: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/profile', { replace: true });
    } catch {
      // Erreur déjà exposée via useAuth().error
    }
  };

  return (
    <AuthLayout
      title="Créer un compte étudiant"
      subtitle="Rejoignez UniHub DZ pour ne plus manquer un événement."
      footer={
        <>
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </>
      }
    >
      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Nom complet"
          name="fullName"
          placeholder="Votre nom et prénom"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <Input
          label="Adresse e-mail"
          type="email"
          name="email"
          placeholder="vous@etu.dz"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Université"
          name="university"
          placeholder="ex: USTHB, ENSIA, Université Constantine 2..."
          value={form.university}
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
          {loading ? 'Création du compte...' : 'Créer mon compte'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
