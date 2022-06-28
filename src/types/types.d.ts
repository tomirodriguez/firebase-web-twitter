type IconPath = {
  path: string;
};

type User = {
  id: string;
  name: string;
  image?: string;
  email: string;
  username: string;
  bio: string;
};

type Tweet = {
  user: User;
  tweet: string;
  timestamp: Date;
};

type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: () => Promise<void>;
  setUserProfile: (user: User) => Promise<void>;
};

type InputValidation = (value: string) => {
  error: boolean;
  errorMessage: string;
};
