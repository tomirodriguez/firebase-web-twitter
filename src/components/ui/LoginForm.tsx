import { FC, SyntheticEvent } from 'react';

type Props = {
  onGoogleSignIn: (event: SyntheticEvent) => void;
};

export const LoginForm: FC<Props> = ({ onGoogleSignIn }) => {
  return (
    <form className="flex" onSubmit={onGoogleSignIn}>
      <button
        title="Google Sign In"
        name="Google Sign In"
        type="submit"
        className="w-full bg-white text-follow-black font-bold rounded-full py-2 hover:opacity-80 transition-opacity outline-none"
      >
        Sign in with Google
      </button>
    </form>
  );
};
