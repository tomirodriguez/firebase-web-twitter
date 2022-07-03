type FirestoreTweet = {
  date: FieldValue;
  tweet: string;
  username: string;
  likes: number;
};

type FirestoreFollow = {
  date: FieldValue;
  username: string;
  follow: string;
};
