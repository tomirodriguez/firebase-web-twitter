import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
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
    <Provider store={store}>
      <DatabaseTestContext
        usersDatabaseInitialState={usersDatabaseInitialState}
        followsDatabaseInitialState={followsDatabaseInitialState}
        timelineDatabaseInitialState={timelineDatabaseInitialState}
        user={user}
        {...contextProps}
      >
        {children}
      </DatabaseTestContext>
    </Provider>
  );
};
