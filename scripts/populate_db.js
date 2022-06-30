const { initializeApp } = require('firebase/app');
const {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} = require('firebase/auth');
const {
  connectFirestoreEmulator,
  getFirestore,
  writeBatch,
  doc,
  Timestamp,
  collection,
} = require('firebase/firestore');
const { USERS } = require('./constants');

const USERS_TO_POPULATE = 10;
const TOTAL_TWEETS = 50;

const TWEETS = [
  'Ullamco aliqua laborum irure enim sit occaecat velit.',
  'Labore do et velit quis voluptate nulla incididunt.',
  'Excepteur sit ex reprehenderit veniam ipsum ipsum sint officia fugiat non.',
  'Labore enim mollit nulla reprehenderit consequat.',
  'Nulla reprehenderit in exercitation proident pariatur anim.',
  'Quis et nostrud anim amet est enim enim eu aute proident quis.',
  'Magna minim sunt eiusmod qui pariatur.',
  'Consectetur non deserunt esse laborum eu est consectetur ea aliquip aliqua sunt fugiat dolore.',
  'Eu laborum Lorem quis aliqua nostrud anim dolor ex proident.',
  'Qui deserunt tempor ut officia eu eiusmod dolore.',
  'Et deserunt labore pariatur id mollit esse ex ad commodo elit est veniam fugiat consequat.',
  'Magna deserunt reprehenderit cupidatat quis laboris enim consectetur nisi dolore irure qui et non.',
  'Reprehenderit dolore qui eiusmod pariatur sint duis ut amet aute.',
  'Cupidatat sunt sint eu id quis cupidatat laborum labore reprehenderit minim elit velit non.',
  'Do proident incididunt non pariatur.',
  'Aliqua esse aute excepteur est reprehenderit eiusmod reprehenderit sint mollit.',
];

const randomNumber = (max) => Math.floor(Math.random() * max);

const randomizeFollows = (user) => {
  const amountOfPeopleFollowing = randomNumber(USERS_TO_POPULATE);
  const userIndex = USERS.indexOf(user);

  const peopleIndexes = Array.from(Array(amountOfPeopleFollowing).keys()).map(
    () => {
      let randomIndex = randomNumber(USERS_TO_POPULATE);
      while (randomIndex === userIndex) {
        randomIndex = randomNumber(USERS_TO_POPULATE);
      }
      return randomIndex;
    }
  );

  return Array.from(new Set(peopleIndexes));
};

const createFollows = () => {
  const usersToPopulate = USERS.filter(
    (user, index) => index < USERS_TO_POPULATE
  );

  const followsTree = usersToPopulate.map((user) => {
    const followers = randomizeFollows(user);
    const newUser = {
      ...user,
      following: followers.length,
      followingUsernames: followers.map(
        (userToFollowIndex) => USERS[userToFollowIndex].username
      ),
      followersUsernames: [],
    };

    return newUser;
  });

  followsTree.forEach((arrayUser, index) => {
    arrayUser.followingUsernames.forEach((follow) => {
      const followUser = followsTree.find((u) => u.username === follow);
      followUser.followers++;
      followUser.followersUsernames.push(arrayUser.username);
    });
  });

  return followsTree;
};

const populate = async () => {
  const firebaseConfig = {
    apiKey: 'demo-local',
    authDomain: 'demo-local',
    projectId: 'demo-local',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const firestore = getFirestore(app);

  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');

  const batch = writeBatch(firestore);

  const promises = [];

  const finalUsers = createFollows();

  finalUsers.forEach((user) => {
    const { email, name: displayName } = user;
    const promise = createUserWithEmailAndPassword(auth, email, 'passwd')
      .then((credential) => {
        return updateProfile(credential.user, { displayName });
      })
      .then(() => {
        const { id, followersUsernames, followingUsernames, ...userWithoutId } =
          user;

        const userRef = doc(firestore, 'users', id);

        const followsRef = doc(firestore, 'follows', id);

        batch.set(userRef, { ...userWithoutId });
        batch.set(followsRef, {
          username: user.username,
          followers: followersUsernames,
          following: followingUsernames,
        });
      });

    promises.push(promise);
  });

  Array.from(Array(TOTAL_TWEETS).keys()).forEach(() => {
    const tweet = TWEETS[randomNumber(TWEETS.length)];
    const username = finalUsers[randomNumber(USERS_TO_POPULATE)].username;
    const timestamp = Timestamp.now();

    const docRef = doc(collection(firestore, 'timeline'));
    const dbTweet = {
      username,
      tweet: tweet,
      timestamp,
      likes: randomNumber(USERS_TO_POPULATE),
    };

    promises.push(batch.set(docRef, dbTweet));
  });

  Promise.all(promises).then(() => {
    batch.commit().then(() => {
      console.info('DATABASE POPULATED');
      process.exit();
    });
  });
};

module.exports.populate = populate;
