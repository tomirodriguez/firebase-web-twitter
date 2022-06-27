import { FC, SyntheticEvent } from 'react';

type Props = {
  onGoogleSignIn: (event: SyntheticEvent) => void;
  error: string;
};

export const LoginForm: FC<Props> = ({ onGoogleSignIn, error }) => {
  return (
    <form className="flex" onSubmit={onGoogleSignIn}>
      <button
        title="Google Sign in"
        type="submit"
        className="w-full bg-white text-follow-black font-bold rounded-full py-2 hover:opacity-80 transition-opacity outline-none"
      >
        Sign in with Google
      </button>
      {error && <p className="text-error text-sm">{error}</p>}
    </form>
  );
};
