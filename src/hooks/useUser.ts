import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useContext } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';

export const useUser: UseUserHook = () => {
  const { loading, user } = useSelector((state: RootState) => state.user);
  const {
    signOut,
    isFollowing: dbIsFollowing,
    followUser,
    unfollowUser,
  } = useContext(DatabaseContext);

  const isFollowing = async (username: string) => {
    if (user)
      return dbIsFollowing({ username: user.username, following: username });
    return false;
  };

  const follow = async (username: string) => {
    if (user) return followUser({ user, toFollowUsername: username });
  };

  const unfollow = async (username: string) => {
    if (user) return unfollowUser({ user, toUnfollowUser: username });
  };

  return {
    user,
    loading,
    signOut,
    isFollowing,
    follow,
    unfollow,
  };
};
