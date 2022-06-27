import { FC } from 'react';
import { Authentication } from '../../components';
import { Logo } from '../../icons';

export const LoginView: FC = () => {
  return (
    <div className="flex flex-col text-white p-8">
      <Logo size={42} />
      <h1 className="font-black text-6xl my-12">Happening now</h1>
      <h2 className="font-bold text-3xl mb-8">Join WebTwitter today.</h2>
      <div className="max-w-[300px]">
        <Authentication />
      </div>
    </div>
  );
};
