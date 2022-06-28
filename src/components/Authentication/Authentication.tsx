import { FC, SyntheticEvent } from 'react';
import { useUser } from '../../hooks/useUser';
import { LoginForm } from '../ui';

export const Authentication: FC = () => {
  const { signIn } = useUser();

  const handleGoogleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    signIn();
  };

  return <LoginForm onGoogleSignIn={handleGoogleSignIn} />;
};
