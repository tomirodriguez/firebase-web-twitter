type IconPath = {
  path: string;
};

type User = {
  id: number;
  name: string;
  image?: string;
  email: string;
};

type Tweet = {
  user: User;
  tweet: string;
  timestamp: Date;
};
