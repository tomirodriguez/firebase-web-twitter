import { getUser } from '../user';
import { getFollowersUsernames } from './utils';

export const getFollowers: GetFollowers = async (username, options) => {
  const usernames = await getFollowersUsernames(username);

  const users: User[] = [];

  await Promise.all(
    usernames.map((username) =>
      getUser({ username }).then((user) => {
        if (user) users.push(user);
      })
    )
  );

  return users.filter((user) => user !== null);
};
