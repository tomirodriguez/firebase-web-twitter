type FirestoreUser = Omit<User, 'id'>;

type FirestoreFollows = {
  username: string;
  followers: string[];
  following: string[];
};
