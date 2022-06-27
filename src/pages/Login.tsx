import { Navigate } from 'react-router-dom';
import { LoginBackground } from '../components/ui/Main/LoginBackground';
import { useUser } from '../hooks';
import { LoginView } from '../views';
import { FOOTER_TEXT } from '../constants/index';
import { FillUserData } from '../components';

export const LoginPage: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) return <pre>loading</pre>;

  if (user && user.username) return <Navigate to={'/home'} replace />;

  return (
    <main className="h-screen flex flex-col bg-black relative">
      {user && !user.username && (
        <div className="absolute w-screen h-screen flex justify-center items-center z-20 bg-card-dark bg-opacity-50">
          <FillUserData suggestedName={user.name} />
        </div>
      )}
      <div className="relative h-full">
        <div className="container mx-auto flex flex-col h-full justify-between bg-transparent">
          <div className="w-full h-full flex items-center bg-transparent">
            <div className="grow bg-transparent hidden lg:flex">
              <LoginBackground />
            </div>
            <div className="shrink-0 w-full lg:w-1/2 h-full relative flex justify-center lg:justify-end">
              <div className="bg-black w-full justify-center lg:w-3/4 lg:min-w-[490px] shrink-0 h-full flex items-center">
                <LoginView />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="shrink-0 py-4 text-secondary-text text-sm text-center">
        {FOOTER_TEXT}
      </footer>
    </main>
  );
};
