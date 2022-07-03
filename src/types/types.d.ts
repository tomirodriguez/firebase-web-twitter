type User = {
  lastUpdate: Date;
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
  date: Date;
  likes: number;
};

type Follow = {
  id: string;
  timestamp: Date;
  username: string;
  followUsername: string;
};
