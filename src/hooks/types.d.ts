type UserProfileHook = (options?: { type: 'ID' | 'USERNAME' }) => {
  getUserProfile: (user: string) => Promise<User | null>;
};
