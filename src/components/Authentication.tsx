import { FC, SyntheticEvent, useState } from 'react';
import { signInWithGoogle } from '../firebase';
import { LoginForm } from './ui';

export const Authentication: FC = () => {
  const [error, setError] = useState('');

  const handleGoogleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    signInWithGoogle().catch((error) => setError(error.message));
  };

  return <LoginForm error={error} onGoogleSignIn={handleGoogleSignIn} />;
};
