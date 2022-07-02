type UserProfileHook = (options?: { type: 'ID' | 'USERNAME' }) => {
  getUserProfile: (user: string) => Promise<User | null>;
};

type UserTweetsHook = () => {
  getUserTweets: (username: string) => Promise<Tweet[]>;
};

type HomeFeedHook = () => {
  getFeed: (user: User) => Promise<Tweet[]>;
};

type UseUserHook = () => {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  tweet: (tweet: string) => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
};
