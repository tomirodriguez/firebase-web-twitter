import { Navigate } from 'react-router-dom';
import { Authentication } from '../components/features';
import { LoadingScreen } from '../components/ui';
import { FOOTER_TEXT } from '../constants/index';
import { useUser } from '../hooks';

export const LoginPage: React.FC = () => {
  const { user, loading } = useUser();

  if (user && user.username) return <Navigate to={'/home'} replace />;

  return (
    <main className="h-screen flex flex-col bg-black relative">
      <Authentication />
      <footer className="shrink-0 py-4 text-secondary-text text-sm text-center">
        {FOOTER_TEXT}
      </footer>

      {loading && (
        <div className="fixed w-full h-full opacity-80">
          <LoadingScreen />
        </div>
      )}
    </main>
  );
};
