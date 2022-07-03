import { getUser } from '../user/getUser';
import { getFollowingsUsernames } from './utils/getFollowingsUsernames';

export const getFollowings: GetFollowings = async (username, options) => {
  const usernames = await getFollowingsUsernames(username);

  const users: User[] = [];
  await Promise.all(
    usernames.map((username) =>
      getUser({ username }).then((user) => {
        if (user) users.push(user);
      })
    )
  );

  return users;
  // const userRef = getFollowsRef(user.id);

  // const userDoc = await getDoc(userRef);

  // if (!userDoc.exists())
  //   throw new CustomError({
  //     message: 'User doesnt exists',
  //     code: USER_DOESNT_EXIST,
  //   });

  // const followingUsers = userDoc.data().following;

  // if (followingUsers.length === 0) return [];

  // let q = query<FirestoreFollow>(
  //   collection(
  //     firestore,
  //     FOLLOWS_COLLECTION
  //   ) as CollectionReference<FirestoreFollow>,
  //   orderBy(documentId()),
  //   where('username', 'in', [...followingUsers]),
  //   limit(options?.size || 10)
  // );

  // if (options?.lastUser) {
  //   q = query(q, startAfter(options.lastUser.username));
  // }

  // const querySnapshot = await getDocs<FirestoreFollow>(q);

  // const usersIds: string[] = [];

  // querySnapshot.forEach((snap) => {
  //   if (snap.exists()) usersIds.push(snap.id);
  // });

  // const users: User[] = [];

  // await Promise.all(
  //   usersIds.map(async (id) => {
  //     return getDoc(getUsersRef(id)).then((doc) => {
  //       if (doc.exists()) users.push({ ...doc.data(), id: doc.id });
  //     });
  //   })
  // );

  // return users;
  return [];
};
