type UserProfileHook = (options?: { type: 'ID' | 'USERNAME' }) => {
  getUserProfile: (user: string) => Promise<User | null>;
};

type UserTweetsHook = () => {
  getUserTweets: (username: string) => Promise<Tweet[]>;
};
