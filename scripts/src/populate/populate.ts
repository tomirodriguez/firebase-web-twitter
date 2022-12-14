import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  DocumentReference,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { Follow, Tweet, User } from '../types';
import { auth, firestore } from './firebaseConfig';
import { getRandomFollowsForUsers } from './utils';
import { USERS, TWEETS } from './utils/mocks';
import { randomNumber } from './utils/utils';
import { Timestamp } from 'firebase/firestore';
import { randomDate } from './utils/getRandomDate';

const USERS_TO_POPULATE = 30;
const TOTAL_TWEETS = 100;

const populate = async () => {
  const users = USERS.filter((_, index) => index < USERS_TO_POPULATE);
  const follows = getRandomFollowsForUsers(users);

  let batch = writeBatch(firestore);

  const authUsers = Promise.all(
    users.map(async (user) => {
      const { email } = user;
      return createUserWithEmailAndPassword(auth, email, 'passwd').then(
        (credential) => {
          return {
            ...user,
            id: credential.user.uid,
          };
        }
      );
    })
  );

  (await authUsers).forEach((authUser) => {
    batch.set(doc(firestore, 'users', authUser.username), { ...authUser });
  });

  await batch.commit();

  batch = writeBatch(firestore);

  let followId = 0;
  follows.forEach((follow) => {
    batch.set(
      doc(firestore, 'follows', `${followId++}`) as DocumentReference<Follow>,
      { ...follow, date: Timestamp.fromDate(follow.date) }
    );
    batch.update(
      doc(firestore, 'users', follow.username) as DocumentReference<User>,
      { following: increment(1) }
    );
    batch.update(
      doc(firestore, 'users', follow.follow) as DocumentReference<User>,
      { followers: increment(1) }
    );
  });

  await batch.commit();

  const tweets: Tweet[] = [];

  while (tweets.length < TOTAL_TWEETS) {
    tweets.push({
      likes: 0,
      date: randomDate(),
      tweet: TWEETS[randomNumber(TWEETS.length)],
      username: users[randomNumber(users.length)].username,
    });
  }

  batch = writeBatch(firestore);

  let tweetId = 0;
  tweets.forEach((tweet) => {
    batch.set(
      doc(firestore, 'timeline', `${tweetId++}`) as DocumentReference<Tweet>,
      { ...tweet, date: Timestamp.fromDate(tweet.date) }
    );
  });

  await batch.commit();

  process.exit();
};

populate();
