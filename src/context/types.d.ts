type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<void>;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  setUserProfile: (user: User) => Promise<void>;
  isFollowing: (username: string) => Promise<boolean>;
};

type FirebaseContextType = {
  getUserProfileWithId: (id: string) => Promise<User | null>;
  getUserProfileWithUsername: (username: string) => Promise<User | null>;
  setUserProfile: (user: User) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isFollowing: (user: string, isFollowing: string) => Promise<boolean>;
};
