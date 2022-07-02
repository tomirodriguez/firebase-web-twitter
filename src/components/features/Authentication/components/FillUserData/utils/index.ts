export const nameValidation = (newName: string): string => {
  if (newName.length === 0) return 'Name must be filled';

  return '';
};

export const usernameValidation = (newUsername: string) => {
  const cleanValue = newUsername.replace(/[^a-zA-Z\d_-]/g, '');
  if (cleanValue.length === 0) return 'Username must be filled';

  return '';
};
