import { DUMMY_USER } from '.';

export const USERS_DATABASE: User[] = [
  DUMMY_USER,
  {
    id: '2',
    name: 'other name',
    username: 'other_username',
    email: 'other_email@email.com',
    followers: 0,
    following: 0,
    bio: 'Ea cillum dolor sunt ut irure incididunt enim do irure.',
  },
];

export const FOLLOWS_DATABASE: FirestoreFollow[] = [
  // { followers: [], following: [], username: DUMMY_USER.username },
  // { followers: [], following: [], username: 'other_username' },
];
