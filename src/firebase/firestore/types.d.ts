type FirestoreTweet = {
  date: FieldValue;
  tweet: string;
  username: string;
  likes: number;
};

type FirestoreFollow = {
  timestamp: FieldValue;
  username: string;
  following: string;
};
