type UserProfileHook = (options?: { type: 'ID' | 'USERNAME' }) => {
  getUser: (user: string) => Promise<User | null>;
};
