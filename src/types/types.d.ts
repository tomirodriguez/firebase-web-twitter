type IconPath = {
  path: string;
};

type User = {
  id: number;
  name: string;
  image?: string;
  email: string;
  username: string;
};

type Tweet = {
  user: User;
  tweet: string;
  timestamp: Date;
};

type DbResponse = {
  success: boolean;
  errorKey: string;
};

type UserContextType = {
  loading: boolean;
  user: User | null;
  tweet: (tweet: string) => Promise<DbResponse>;
  logout: () => Promise<DbResponse>;
};
