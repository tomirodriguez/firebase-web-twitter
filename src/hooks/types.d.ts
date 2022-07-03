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

type UseHomeFeedHook = () => {
  loading: boolean;
  feed: Tweet[];
  showMore: () => Promise<Tweet[]>;
};

type UseUserHook = () => {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isFollowing: (username: string) => Promise<boolean>;
  follow: (username: string) => Promise<void>;
  unfollow: (username: string) => Promise<void>;
  tweet: (tweet: string) => Promise<void>;
  discoverPeople: DiscoverPeople;
};

type DiscoverPeople = (size?: number) => Promise<User[]>;

type GetFeed = () => Promise<Tweet[]>;
