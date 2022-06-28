import { FC } from 'react';
import Icons, { iLogo } from '../../icons';
import { PRIMARY_BLUE } from '../../colors/index';

export const Loading: FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <Icons icon={iLogo} size={100} color={PRIMARY_BLUE} />
    </div>
  );
};
