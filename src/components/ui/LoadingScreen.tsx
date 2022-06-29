import { FC } from 'react';
import Icons, { iLogo } from '../../icons';
import { PRIMARY_BLUE } from '../../colors/index';

export const LoadingScreen: FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black fixed top-0 left-0 z-50">
      <Icons icon={iLogo} size={100} color={PRIMARY_BLUE} />
    </div>
  );
};
