export const EMPTY_PROFILE_USER: User = {
  id: '1',
  name: '',
  username: '',
  email: 'email@email.com',
  followers: 0,
  following: 0,
  bio: '',
};

export const DUMMY_USER: User = {
  id: '1',
  name: 'name',
  username: 'username',
  email: 'email@email.com',
  followers: 0,
  following: 0,
  bio: 'Ut ad sint officia consequat ex consequat velit consectetur enim et voluptate fugiat amet ipsum.',
};

export * from './users';
export * from './tweets';
