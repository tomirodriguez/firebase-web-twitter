import { INVALID_EMPTY_NAME, INVALID_EMPTY_USERNAME } from '../../../errors';

export const nameValidation = (newName: string): string => {
  if (newName.length === 0) return INVALID_EMPTY_NAME;

  return '';
};

export const usernameValidation = (newUsername: string) => {
  const cleanValue = newUsername.replace(/[^a-zA-Z\d_-]/g, '');
  if (cleanValue.length === 0) return INVALID_EMPTY_USERNAME;

  return '';
};
