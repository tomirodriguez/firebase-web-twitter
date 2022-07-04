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
};
