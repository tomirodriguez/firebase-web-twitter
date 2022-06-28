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
