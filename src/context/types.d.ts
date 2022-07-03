type DatabaseContext = {
  userLoginObserver: (observer: UserLoginObserver) => RemoveObserver;
  signInWithGoogle: () => Promise<void>;
  signOut: SignOut;
  addUser: AddUser;
  getUser: GetUser;
  followUser: FollowUser;
  unfollowUser: UnfollowUser;
  isFollowing: IsFollowing;
  postTweet: PostTweet;
  getTweets: GetTweets;
  getNotFollowingPeople: GetNotFollowingPeople;
  getFollowings: GetFollowings;
  getFollowers: GetFollowers;

  getUserTweets: (username: string) => Promise<Tweet[]>;

  onHomeFeedChange: (
    user: User,
    observer: (tweets: Tweet) => void,
    following: string[]
  ) => Unsubscribe;
};

type Options = { size?: number; date?: Date };

type GetFollowers = (
  username: string,
  options?: { size?: number; lastUser?: string }
) => Promise<User[]>;

type GetFollowings = (
  username: string,
  options?: { size?: number; lastUser?: string }
) => Promise<User[]>;

type GetNotFollowingPeople = (
  username: string,
  options?: Options
) => Promise<User[]>;

type GetFollowingUsernames = (username: string) => Promise<string[]>;

type GetTweets = (usernames: string[], options?: Options) => Promise<Tweet[]>;

type AddUser = (user: User) => Promise<void>;

type GetUser = ({
  id,
  username,
}: {
  id?: string;
  username?: string;
}) => Promise<User>;

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

type UserLoginObserver = (user: User | null) => void;

type SignOut = () => Promise<void>;
