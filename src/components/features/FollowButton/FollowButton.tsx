import React, { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { followUser } from '../../../firebase/firestore/user/followUser';
import { useEffect } from 'react';

type Props = {
  username: string;
};

export const FollowButton: React.FC<Props> = ({ username }) => {
  const { isFollowing, user } = useUser();
  const [followingUser, setFollowingUser] = useState(false);

  useEffect(() => {
    if (user) isFollowing(username).then(setFollowingUser);
  }, [isFollowing, username, user]);

  if (!user) return null;

  const handleFollowUser = () => {
    followUser(user, username);
  };

  return (
    <button
      title={'Follow'}
      type={'button'}
      className="w-18 h-8 px-2 text-sm text-follow-black bg-follow-white transition-opacity rounded-full font-bold  hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={followingUser}
      onClick={handleFollowUser}
    >
      Follow
    </button>
  );
};
