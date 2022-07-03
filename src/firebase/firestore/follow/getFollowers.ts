import { getUser } from '../user';
import { getFollowersUsernames } from './utils';

export const getFollowers: GetFollowers = async (username, options) => {
  const usernames = await getFollowersUsernames(username);

  console.log({ usernames });
  const users = await Promise.all(
    usernames.map((username) => getUser({ username }))
  );

  return users.filter((user) => user !== null);
};
