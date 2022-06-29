type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: () => Promise<void>;
  setUserProfile: (user: User) => Promise<void>;
};

type FirebaseContextType = {
  getUserProfileWithId: (id: string) => Promise<User | null>;
  getUserProfileWithUsername: (username: string) => Promise<User | null>;
  saveUserProfile: (user: User) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};
