export const EMPTY_PROFILE_USER: User = {
  email: 'anemail@gmail.com',
  name: '',
  bio: '',
  username: '',
  id: '99',
  followers: 0,
  following: 0,
};

export const DUMMY_USER: User = {
  id: '9999',
  email: 'tomi@gmail.com',
  name: 'tomi',
  username: 'tomiar',
  bio: 'Aca viene la bio',
  followers: 0,
  following: 0,
};

export * from './users';
export * from './tweets';
