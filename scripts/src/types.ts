export type User = {
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

export type Tweet = {
  username: string;
  tweet: string;
  date: Date;
  likes: number;
};

export type Follow = {
  date: Date;
  username: string;
  follow: string;
};
