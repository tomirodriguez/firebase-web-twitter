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

type UseDiscoverHook = (initialSearch: number) => {
  loading: boolean;
  users: User[];
  showMore: () => Promise<void>;
};

type UseHomeFeedHook = () => {
  loading: boolean;
  feed: Tweet[];
  showMore: () => Promise<void>;
};

type UseUserHook = () => {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isFollowing: (username: string) => Promise<boolean>;
  follow: (username: string) => Promise<void>;
  unfollow: (username: string) => Promise<void>;
  tweet: (tweet: string) => Promise<void>;
};

type DiscoverPeople = (size?: number) => Promise<User[]>;

type GetFeed = () => Promise<Tweet[]>;
