type User = {
  id: string;
  name: string;
  image?: string;
  email: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
};

type Tweet = {
  id: string;
  username: string;
  tweet: string;
  timestamp: Date;
  likes: number;
};
