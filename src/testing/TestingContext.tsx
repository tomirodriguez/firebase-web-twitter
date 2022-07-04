import { FC, PropsWithChildren } from 'react';
import { UserProvider } from '../context';
import { DatabaseTestContext } from './DatabaseTestContext';
import { DUMMY_USER, FOLLOWS_DATABASE, USERS_DATABASE } from './mocks';
import { TIMELINE_DATABASE } from './mocks/tweets';

type InitialState = {
  user?: User | null;
  usersDatabaseInitialState?: User[];
  followsDatabaseInitialState?: Follow[];
  timelineDatabaseInitialState?: Tweet[];
};

export const TestingContext: FC<
  PropsWithChildren & InitialState & Partial<DatabaseContext>
> = ({
  children,
  user = DUMMY_USER,
  usersDatabaseInitialState = USERS_DATABASE,
  followsDatabaseInitialState = FOLLOWS_DATABASE,
  timelineDatabaseInitialState = TIMELINE_DATABASE,
  ...contextProps
}) => {
  return (
    <DatabaseTestContext
      usersDatabaseInitialState={usersDatabaseInitialState}
      followsDatabaseInitialState={followsDatabaseInitialState}
      timelineDatabaseInitialState={timelineDatabaseInitialState}
      user={user}
      {...contextProps}
    >
      <UserProvider>{children}</UserProvider>
    </DatabaseTestContext>
  );
};
