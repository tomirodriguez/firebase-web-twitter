import React, { useEffect, useState } from 'react';
import { ALREADY_FOLLOWING, NOT_FOLLOWING } from '../../../firebase/errorKeys';
import { useUser } from '../../../hooks/useUser';
import { CustomError } from '../../../utils/CustomError';
import { FollowButton, UnfollowButton } from '../../ui';

type Props = {
  username: string;
};

export const FollowInteraction: React.FC<Props> = ({ username }) => {
  const { user, isFollowing, follow, unfollow } = useUser();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  useEffect(() => {
    if (user && isFirstLoad)
      isFollowing(username)
        .then((following) => {
          if (isFollowingUser !== following) setIsFollowingUser(following);
        })
        .finally(() => setIsFirstLoad(false));
  }, [isFollowing, username, user, isFirstLoad, isFollowingUser]);

  if (!user) return null;

  const handleFollowUser = async () => {
    setLoading(true);
    await follow(username)
      .then(() => setIsFollowingUser(true))
      .catch((error) => {
        if (error instanceof CustomError && error.code === ALREADY_FOLLOWING) {
          setIsFollowingUser(true);
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleUnfollowUser = async () => {
    setLoading(true);
    unfollow(username)
      .then(() => setIsFollowingUser(false))
      .catch((error) => {
        if (error instanceof CustomError && error.code === NOT_FOLLOWING) {
          setIsFollowingUser(false);
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {!isFollowingUser ? (
        <FollowButton onClick={handleFollowUser} loading={loading} />
      ) : (
        <UnfollowButton onClick={handleUnfollowUser} loading={loading} />
      )}
    </div>
  );
};
