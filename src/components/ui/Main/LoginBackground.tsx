import { FC } from 'react';
import { Logo } from '../../../icons/Logo';
import Background from '../../../images/login_bg.png';

export const LoginBackground: FC = () => {
  return (
    <div className="absolute top-0 left-0 w-7/12 h-full flex items-center justify-center">
      <div className="absolute w-1/2 max-w-[360px]">
        <Logo size={'100%'} />
      </div>
      <img
        className="object-cover h-full w-full"
        src={Background}
        alt="Login background"
      />
    </div>
  );
};
