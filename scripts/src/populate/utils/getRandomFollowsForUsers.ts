import { Follow, User } from '../../types';
import { randomArrayOfNumbers, randomNumber } from './utils';

export const getRandomFollowsForUsers = (users: User[]): Follow[] => {
  const follows: Follow[] = [];

  users.forEach((user) => {
    const indexOfPeopleToFollow = randomArrayOfNumbers(
      randomNumber(users.length),
      users.length
    );

    indexOfPeopleToFollow.forEach((follow) => {
      const followUsername = users[follow].username;

      if (user.username === followUsername) return;
      follows.push({
        date: new Date(),
        username: user.username,
        follow: followUsername,
      });
    });
  });

  return follows;
};
