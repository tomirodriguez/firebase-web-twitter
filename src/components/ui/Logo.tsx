import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../icons';
import Icon from '../icons/Icon';

type Props = {
  size?: number;
};
export const Logo: FC<Props> = ({ size = 30 }) => {
  return (
    <Link to={'/home'} title={'WebTwitter'}>
      <div className="aspect-square w-fit py-4 rounded-full md:p-3 hover:bg-hover-white flex justify-center items-center">
        <Icon icon={logo} size={size} />
      </div>
    </Link>
  );
};
