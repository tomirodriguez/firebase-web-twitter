import { CustomError } from '../../utils/CustomError';

export const INVALID_CALL = 'invalid_call';
export const MISSING_CREDENTIALS = 'missing_credential';
export const USER_DOESNT_EXISTS = 'user_doesnt_exists';
export const NOT_FOLLOWING = 'not_following';
export const USER_DOESNT_EXIST = 'user_doesnt_exists';

export const USER_DOESNT_EXIST_ERROR = new CustomError({
  code: USER_DOESNT_EXIST,
  message: 'User does not exist',
});

export const FOLLOW_INEXISTENT_USER = new CustomError({
  code: USER_DOESNT_EXISTS,
  message: "You're trying to follow a non existent user",
});
export const UNFOLLOW_INEXISTENT_USER = new CustomError({
  code: USER_DOESNT_EXISTS,
  message: "You're trying to unfollow a non existent user",
});
