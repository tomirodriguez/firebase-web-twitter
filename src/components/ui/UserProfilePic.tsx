import { FC } from 'react';
import { Link } from 'react-router-dom';
import { USERS_URL_PATH } from '../../constants/pahts';

type Props = {
  name: string;
  username: string;
  size?: number;
  src?: string;
  linkToProfile?: boolean;
};

export const UserProfilePic: FC<Props> = ({
  src,
  name,
  size = 48,
  username,
  linkToProfile = true,
}) => {
  const pictureContent = (
    <>
      {src ? (
        <img
          className="rounded-full object-cover aspect-square"
          src={src}
          alt={name}
          width={size}
          height={size}
        />
      ) : (
        <div
          className="aspect-square flex flex-col items-center justify-center border-2 border-transparent rounded-full"
          style={{
            width: size,
            backgroundColor: 'brown',
            fontSize: size * 0.5,
          }}
        >
          {name[0].toUpperCase()}
        </div>
      )}
    </>
  );

  return linkToProfile ? (
    <Link to={`${USERS_URL_PATH}${username}`}>{pictureContent}</Link>
  ) : (
    pictureContent
  );
};
