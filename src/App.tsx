import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components';
import {
  NewFollowersList,
  SearchBar,
  SignOut,
  UserFeed,
} from './components/features';
import { LoadingScreen, NavBar, TopBar } from './components/ui';
import { Aside, Header, Main, MainSection } from './components/ui/layouts';
import { useUser } from './hooks';
import {
  DiscoverPage,
  FollowersPage,
  FollowingPage,
  HomePage,
  LoginPage,
} from './pages';

const App = () => {
  const { loading } = useUser();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <RequireAuth>
            <div className="bg-main-dark text-slate-100 flex flex-col">
              <div className="container mx-auto flex text-primary-white">
                <div className="md:mx-4 flex w-full">
                  <Header>
                    <NavBar />
                    <SignOut />
                  </Header>
                  <Main>
                    <div className="flex justify-between h-full">
                      <MainSection>
                        <TopBar />
                        <Routes>
                          <Route
                            path="/"
                            element={<Navigate to="/home" replace />}
                          ></Route>
                          <Route path="/home" element={<HomePage />} />
                          <Route path="users">
                            <Route path=":username" element={<UserFeed />} />
                          </Route>
                          <Route path="followers">
                            <Route
                              path=":username"
                              element={<FollowersPage />}
                            />
                          </Route>
                          <Route path="following">
                            <Route
                              path=":username"
                              element={<FollowingPage />}
                            />
                          </Route>
                          <Route
                            path="people"
                            element={<DiscoverPage />}
                          ></Route>
                        </Routes>
                      </MainSection>

                      <Aside>
                        <SearchBar />
                        <div className="mt-4">
                          <NewFollowersList />
                        </div>
                      </Aside>
                    </div>
                  </Main>
                </div>
              </div>
            </div>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
