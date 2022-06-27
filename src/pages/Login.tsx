import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks';
import Background from '../images/login_bg.png';

export const LoginPage: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) return <pre>loading</pre>;

  if (user) return <Navigate to={'/home'} replace />;

  return (
    <div>
      <img src={Background} alt="Login background" />
      <button>Login</button>
    </div>
  );
};
