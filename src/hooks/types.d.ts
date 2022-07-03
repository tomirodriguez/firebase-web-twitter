type UseFollowingsHook = () => {
  getFollowings: (username: string, size?: number) => Promise<User[]>;
  loading: boolean;
};
type UseFollowersHook = () => {
  getFollowers: (username: string, size?: number) => Promise<User[]>;
  loading: boolean;
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
  getFeedBeforeDate: GetFeedBeforeDate;
  discoverPeople: DiscoverPeople;
};

type DiscoverPeople = (size?: number) => Promise<User[]>;

type GetFeedBeforeDate = (options?: {
  date?: Date;
  size?: number;
}) => Promise<Tweet[]>;
