export const EMPTY_PROFILE_USER: User = {
  lastUpdate: new Date(),
  id: '1',
  name: '',
  username: '',
  email: 'email@email.com',
  followers: 0,
  following: 0,
  bio: '',
};

export const DUMMY_USER: User = {
  lastUpdate: new Date(),
  id: '1',
  name: 'name',
  username: 'username',
  email: 'email@email.com',
  followers: 0,
  following: 0,
  bio: 'Ut ad sint officia consequat ex consequat velit consectetur enim et voluptate fugiat amet ipsum.',
};

export const OTHER_DUMMY_USER: User = {
  lastUpdate: new Date(),
  id: '2',
  name: 'other name',
  username: 'other_username',
  email: 'other_email@email.com',
  followers: 0,
  following: 0,
  bio: 'Ut ad sint officia consequat ex consequat velit consectetur enim et voluptate fugiat amet ipsum.',
};

export const USERS_DATABASE: User[] = [];
