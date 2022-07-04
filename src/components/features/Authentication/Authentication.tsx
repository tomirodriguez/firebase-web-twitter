import { FC, SyntheticEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { DatabaseContext } from '../../../context/DatabaseContext';
import { useUser } from '../../../hooks/useUser';
import { Logo } from '../../../icons';
import { userLoaded } from '../../../reducers';
import { FillUserData } from './components/FillUserData';
import { LoginBackground } from './components/LoginBackground';
import { LoginForm } from './components/LoginForm';
import { USERNAME_TAKEN } from './errors';

export const Authentication: FC = () => {
  const { user } = useUser();
  const {
    getUser,
    addUser,
    signInWithGoogle: signIn,
  } = useContext(DatabaseContext);
  const dispatch = useDispatch();

  if (user && user.username) return null;

  const handleGoogleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    signIn();
  };

  const handleProfileSubmited: OnUserProfileDataSubmited = async ({
    name,
    username,
    bio,
  }) => {
    if (!user) return {};

    const existingUser = await getUser({ username });

    if (existingUser) return { field: 'username', error: USERNAME_TAKEN };

    const newUser = { ...user, name, username, bio };
    await addUser({ ...user, name, username, bio }).then(() => {
      dispatch(userLoaded({ user: newUser }));
    });

    return {};
  };

  return (
    <>
      {user && !user.username && (
        <div className="absolute w-screen h-screen flex justify-center items-center z-20 bg-card-dark bg-opacity-50">
          <FillUserData
            suggestedName={user.name}
            onProfileSubmitted={handleProfileSubmited}
          />
        </div>
      )}
      <div className="relative h-full">
        <div className="container mx-auto flex flex-col h-full justify-between bg-transparent">
          <div className="w-full h-full flex items-center bg-transparent">
            <div className="grow bg-transparent hidden lg:flex">
              <LoginBackground />
            </div>
            <div className="shrink-0 w-full lg:w-1/2 h-full relative flex justify-center lg:justify-end">
              <div className="bg-black w-full justify-center lg:w-3/4 lg:min-w-[490px] shrink-0 h-full flex items-center">
                <div className="flex flex-col text-white p-8">
                  <Logo size={42} />
                  <h1 className="font-black text-6xl my-12">Happening now</h1>
                  <h2 className="font-bold text-3xl mb-8">
                    Join WebTwitter today.
                  </h2>
                  <div className="max-w-[300px]">
                    <LoginForm onGoogleSignIn={handleGoogleSignIn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
