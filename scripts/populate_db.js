const populate = async () => {
  const { initializeApp } = require('firebase/app');
  const {
    getFirestore,
    connectFirestoreEmulator,
    writeBatch,
    doc,
  } = require('firebase/firestore');
  const {
    getAuth,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    updateProfile,
  } = require('firebase/auth');

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

  const USERS = require('./users');
  USERS.forEach((user) => {
    const { email, name: displayName } = user;
    const promise = createUserWithEmailAndPassword(auth, email, 'passwd')
      .then((credential) => {
        return updateProfile(credential.user, { displayName });
      })
      .then(() => {
        const { id, ...userWithoutId } = user;

        const userRef = doc(firestore, 'users', id);

        const followsRef = doc(firestore, 'follows', id);

        batch.set(userRef, { ...userWithoutId });
        batch.set(followsRef, {
          username: user.username,
          followers: [],
          following: [],
        });
      });

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    batch.commit().then(() => {
      console.log('DATABASE POPULATED');
      process.exit();
    });
  });
};

module.exports.populate = populate;
