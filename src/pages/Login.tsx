import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks';

export const LoginPage: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) return <pre>loading</pre>;

  if (user) return <Navigate to={'/home'} replace />;

  return (
    <div>
      <button>Login</button>
    </div>
  );
};
