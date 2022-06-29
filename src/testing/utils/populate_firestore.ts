import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, DocumentReference, writeBatch } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';
import { USERS_COLLECTION, FOLLOWS_COLLECTION } from '../../firebase/constants';
import { USERS } from '../mocks';

export const populate = async () => {
  const batch = writeBatch(firestore);

  const promises: Promise<void>[] = [];
  USERS.forEach((user) => {
    const { email, name: displayName } = user;
    const promise = createUserWithEmailAndPassword(auth, email, 'passwd')
      .then((credential) => {
        return updateProfile(credential.user, { displayName });
      })
      .then(() => {
        const { id, ...userWithoutId } = user;

        const userRef = doc(
          firestore,
          USERS_COLLECTION,
          id
        ) as DocumentReference<FirestoreUser>;

        const followsRef = doc(
          firestore,
          FOLLOWS_COLLECTION,
          id
        ) as DocumentReference<FirestoreFollows>;

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
    batch.commit();
  });
};
