type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<void>;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  setUserProfile: (user: User) => Promise<void>;
  isFollowing: (username: string) => Promise<boolean>;
  followUser: (username: string) => Promise<void>;
  unfollowUser: (username: string) => Promise<void>;
};

type FirebaseContextType = {
  getUserProfileWithId: (id: string) => Promise<User | null>;
  getUserProfileWithUsername: (username: string) => Promise<User | null>;
  setUserProfile: (user: User) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isFollowing: (user: string, isFollowing: string) => Promise<boolean>;
  followUser: (user: User, toFollow: string) => Promise<void>;
  unfollowUser: (user: User, toUnfollow: string) => Promise<void>;
};
