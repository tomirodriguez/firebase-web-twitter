type DatabaseContext = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: SignOut;
  addUser: AddUser;
  getUser: GetUser;
  followUser: FollowUser;
  unfollowUser: UnfollowUser;
  isFollowing: IsFollowing;
  getTweets: GetTweets;
  getUsers: GetUsers;
  getFollowings: GetFollowings;
  getFollowers: GetFollowers;
  postTweet: PostTweet;
  getFollowingsUsernames: GetFollowingsUsernames;
  getUserTweets: (username: string) => Promise<Tweet[]>;

  onHomeFeedChange: OnHomeFeedChange;
  onNewFollowing: OnNewFollowing;
  onFollowerGain: OnFollowerGain;
};

type OnFollowerGain = (
  username: string,
  observer: (username: string) => void
) => Unsubscribe;

type OnNewFollowing = (
  username: string,
  observer: (username: string) => void
) => Unsubscribe;

type OnHomeFeedChange = (
  user: User,
  observer: (tweets: Tweet) => void,
  following: string[]
) => Unsubscribe[];

type Options = { size?: number; date?: Date };

type GetFollowers = (
  username: string,
  options?: { size?: number; lastUser?: string }
) => Promise<User[]>;

type GetFollowingsUsernames = (username: string) => Promise<string[]>;

type GetFollowings = (
  username: string,
  options?: { size?: number; lastUser?: string }
) => Promise<User[]>;

type GetUsers = (options?: {
  size?: number;
  lastUser?: User;
  exclude?: string[];
}) => Promise<User[]>;

type GetFollowingUsernames = (username: string) => Promise<string[]>;

type GetTweets = (usernames: string[], options?: Options) => Promise<Tweet[]>;

type AddUser = (user: User) => Promise<void>;

type GetUser = ({
  id,
  username,
}: {
  id?: string;
  username?: string;
}) => Promise<User | null>;

type IsFollowing = ({
  username,
  following,
}: {
  username: string;
  following: string;
}) => Promise<boolean>;

type FollowUser = ({
  user,
  toFollowUsername,
}: {
  user: User;
  toFollowUsername: string;
}) => Promise<void>;

type UnfollowUser = ({
  user,
  toUnfollowUser,
}: {
  user: User;
  toUnfollowUser: string;
}) => Promise<void>;

type PaginationOptions<T> = {
  size?: number;
  after: T;
};

type GetPeopleToFollow = ({
  user,
  options,
}: {
  user: User;
  size?: number;
  startingAt?: QueryDocumentSnapshot<FirestoreUser>;
}) => Promise<{
  users: User[];
  lastVisible: QueryDocumentSnapshot<FirestoreUser>;
}>;

type PostTweet = ({
  username,
  tweet,
}: {
  username: string;
  tweet: string;
}) => Promise<void>;

type RemoveObserver = () => void;

type UserLoginObserver = (user: User | null) => Promise<void>;

type SignOut = () => Promise<void>;

type UserContext = {
  user: User | null;
  followingUsernames: string[];
  followingUsers: Map<string, User>;
  loading: boolean;
  createUserProfile: (user: User) => Promise<void>;
  isFollowing: (username: string) => Promise<boolean>;
  follow: (username: string) => Promise<void>;
  unfollow: (username: string) => Promise<void>;
};
