import { onAuthStateChanged } from 'firebase/auth';
import { createContext, FC, PropsWithChildren } from 'react';
import { auth } from '../firebase';
import { signInWithGoogle, signOut } from '../firebase/auth';
import {
  followUser,
  getFollowers,
  getFollowings,
  isFollowing,
  unfollowUser,
  getFollowingsUsernames,
} from '../firebase/firestore/follow';
import {
  getTweets,
  getUserTweets,
  onHomeFeedChange,
  postTweet,
} from '../firebase/firestore/tweet';
import { addUser, getUser, getUsers } from '../firebase/firestore/user';

const defaultFirebaseContext: DatabaseContext = {
  userLoginObserver: () => () => {},
  signInWithGoogle,
  signOut,
  addUser,
  getUser,
  followUser,
  unfollowUser,
  isFollowing,
  postTweet,
  getUserTweets,
  getTweets,
  onHomeFeedChange,
  getUsers,
  getFollowings,
  getFollowers,
  getFollowingsUsernames,
};

export const FirebaseContext = createContext<DatabaseContext>(
  defaultFirebaseContext
);

export const FirebaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const userLoginObserver = (observer: UserLoginObserver) => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return observer(null);

      const { uid: id, email, displayName } = user;
      const firebaseUser = await getUser({ id });
      if (!firebaseUser)
        observer({
          lastUpdate: new Date(),
          id,
          email: email || '',
          bio: '',
          followers: 0,
          following: 0,
          username: '',
          name: displayName || '',
        });
      else observer(firebaseUser);
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...defaultFirebaseContext,
        userLoginObserver,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
