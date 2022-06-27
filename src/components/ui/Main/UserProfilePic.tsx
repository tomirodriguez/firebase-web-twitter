import { FC } from 'react';
import { User } from '../../../icons';

type Props = {
  src: string | undefined;
  name: string;
  size?: number;
};

export const UserProfilePic: FC<Props> = ({ src, name, size = 48 }) => {
  return src ? (
    <img
      className="rounded-full"
      src={src}
      alt={name}
      width={size}
      height={size}
    />
  ) : (
    <User size={size} />
  );
};
