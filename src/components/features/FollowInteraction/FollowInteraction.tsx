import React, { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { FollowButton, UnfollowButton } from '../../ui';
import { CustomError } from '../../../utils/CustomError';
import { ALREADY_FOLLOWING, NOT_FOLLOWING } from '../../../firebase/errorKeys';

type Props = {
  username: string;
};

export const FollowInteraction: React.FC<Props> = ({ username }) => {
  const { isFollowing, followUser, unfollowUser, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [followingUser, setFollowingUser] = useState(false);

  useEffect(() => {
    if (user) isFollowing(username).then(setFollowingUser);
  }, [isFollowing, username, user]);

  if (!user) return null;

  const handleFollowUser = () => {
    setLoading(true);
    followUser(username)
      .then(() => setFollowingUser(true))
      .catch((error) => {
        if (error instanceof CustomError && error.code === ALREADY_FOLLOWING) {
          setFollowingUser(true);
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleUnfollowUser = () => {
    setLoading(true);
    unfollowUser(username)
      .then(() => setFollowingUser(false))
      .catch((error) => {
        if (error instanceof CustomError && error.code === NOT_FOLLOWING) {
          setFollowingUser(false);
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false));
  };

  return !followingUser ? (
    <FollowButton
      following={followingUser}
      onClick={handleFollowUser}
      loading={loading}
    />
  ) : (
    <UnfollowButton
      following={followingUser}
      onClick={handleUnfollowUser}
      loading={loading}
    />
  );
};
