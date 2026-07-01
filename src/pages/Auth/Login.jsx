import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || '/profile';
      navigate(redirectTo, { replace: true });
    } catch {
      // L'erreur est déjà gérée et exposée via useAuth().error
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Accédez à votre espace étudiant UniHub DZ."
      footer={
        <>
          Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
        </>
      }
    >
      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
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
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <p style={{ fontSize: '0.78rem', marginTop: 14, textAlign: 'center' }}>
        Démo : amine.belkacem@etu.dz / lina.cherif@etu.dz (mot de passe libre,
        4 caractères min.)
      </p>
    </AuthLayout>
  );
};

export default Login;
