import { FC, PropsWithChildren, useContext } from 'react';
import { FirebaseContext } from './FirebaseContext';

export const DatabaseContext = FirebaseContext;

export const DatabaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const context = useContext<DatabaseContext>(FirebaseContext);

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};
