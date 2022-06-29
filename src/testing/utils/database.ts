export const USERS_DATABASE: User[] = [
  {
    id: '1',
    name: 'name',
    username: 'username',
    email: 'email@email.com',
    followers: 0,
    following: 0,
    bio: 'Ut ad sint officia consequat ex consequat velit consectetur enim et voluptate fugiat amet ipsum.',
  },
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

export const FOLLOWS_DATABASE: FirestoreFollows[] = [
  { followers: [], following: [], username: 'username' },
  { followers: [], following: [], username: 'other_username' },
];
