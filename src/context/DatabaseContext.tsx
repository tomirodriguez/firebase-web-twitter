import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLoaded } from '../reducers';
import { FirebaseContext } from './FirebaseContext';

export const DatabaseContext = FirebaseContext;

export const DatabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = useContext<DatabaseContext>(FirebaseContext);
  const { userLoginObserver, getFollowingsUsernames } = context;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = userLoginObserver(async (user) => {
      const followers: string[] = [];
      let followings: string[] = [];
      if (user) {
        followings = await getFollowingsUsernames(user.username);
      }
      dispatch(userLoaded({ user, followers, followings }));
    });

    return unsubscribe;
  }, [userLoginObserver, dispatch, getFollowingsUsernames]);

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};
