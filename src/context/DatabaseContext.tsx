import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLoaded } from '../reducers';
import { FirebaseContext } from './FirebaseContext';

export const DatabaseContext = FirebaseContext;

export const DatabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = useContext<DatabaseContext>(FirebaseContext);
  const { userLoginObserver } = context;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = userLoginObserver((user) => {
      dispatch(userLoaded(user));
    });

    return unsubscribe;
  }, [userLoginObserver, dispatch]);

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};
