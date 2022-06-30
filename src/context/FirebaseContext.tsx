import { createContext, FC, PropsWithChildren } from 'react';
import {
  getUserProfileWithId,
  getUserProfileWithUsername,
  setUserProfile,
} from '../firebase/firestore/user';
import {
  isFollowing,
  followUser,
  unfollowUser,
  getFollowingUsers,
} from '../firebase/firestore/follow';
import { signInWithGoogle, signOut } from '../firebase/auth';
import {
  postTweet,
  getUserTweets,
  getHomeFeed,
  onHomeFeedChange,
} from '../firebase/firestore/tweet';

const defaultFirebaseContext: FirebaseContextType = {
  getUserProfileWithId,
  getUserProfileWithUsername,
  setUserProfile,
  signInWithGoogle,
  signOut,
  isFollowing,
  followUser,
  unfollowUser,
  postTweet,
  getUserTweets,
  getHomeFeed,
  onHomeFeedChange,
  getFollowingUsers,
};

export const FirebaseContext = createContext<FirebaseContextType>(
  defaultFirebaseContext
);

export const FirebaseProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={defaultFirebaseContext}>
      {children}
    </FirebaseContext.Provider>
  );
};
