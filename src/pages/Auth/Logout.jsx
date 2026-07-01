import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      await logout();
      navigate('/', { replace: true });
    };
    run();
  }, [logout, navigate]);

  return <Loader fullPage label="Déconnexion en cours..." />;
};

export default Logout;
