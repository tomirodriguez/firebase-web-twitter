type DatabaseContext = {
  userLoginObserver: (observer: UserLoginObserver) => RemoveObserver;

  signInWithGoogle: () => Promise<void>;
  signOut: SignOut;
  addUser: (user: User) => Promise<void>;
  getUser: GetUser;
  followUser: FollowUser;
  unfollowUser: UnfollowUser;
  isFollowing: IsFollowing;
  postTweet: PostTweet;

  getUserTweets: (username: string) => Promise<Tweet[]>;
  getHomeFeed: (
    user: User,
    options?: { size?: number; timestamp: Timestamp }
  ) => Promise<Tweet[]>;
  getFollowingUsernames: (user: User) => Promise<string[]>;
  getNewFollowers: (
    user: User,
    options?: { size?: number; lastUser?: User }
  ) => Promise<User[]>;
  getFollowingUsers: (
    user: User,
    options?: { size?: number; lastUser?: User }
  ) => Promise<User[]>;
  getFollowersUsers: (
    user: User,
    options?: { size?: number; lastUser?: User }
  ) => Promise<User[]>;
  onHomeFeedChange: (
    user: User,
    observer: (tweets: Tweet) => void,
    following: string[]
  ) => Unsubscribe;
};

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

type UserLoginObserver = (user: User | null) => void;

type SignOut = () => Promise<void>;
