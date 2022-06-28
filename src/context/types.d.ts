type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: () => Promise<void>;
  setUserProfile: (user: User) => Promise<void>;
};
