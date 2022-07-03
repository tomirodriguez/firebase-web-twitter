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
  isFollowing: (username: string) => Promise<boolean>;
  follow: (username: string) => Promise<void>;
  unfollow: (username: string) => Promise<void>;
};
