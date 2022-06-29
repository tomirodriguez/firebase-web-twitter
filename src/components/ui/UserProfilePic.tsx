import { FC } from 'react';
import { Link } from 'react-router-dom';
import { USERS_URL_PATH } from '../../constants/pahts';
import { User } from '../../icons';

type Props = {
  src: string | undefined;
  name: string;
  username: string;
  size?: number;
};

export const UserProfilePic: FC<Props> = ({
  src,
  name,
  size = 48,
  username,
}) => {
  return (
    <Link to={`${USERS_URL_PATH}${username}`}>
      {src ? (
        <img
          className="rounded-full object-cover aspect-square"
          src={src}
          alt={name}
          width={size}
          height={size}
        />
      ) : (
        <User size={size} />
      )}
    </Link>
  );
};
