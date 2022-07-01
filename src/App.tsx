import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, SearchBar } from './components';
import { NewFollowersList } from './components/features';
import { UserFeed } from './components/features/UserFeed';
import { Header, TopBar } from './components/ui';
import { DiscoverPage, HomePage, LoginPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <div className="bg-main-dark text-slate-100 flex flex-col">
            <div className="container mx-auto max-w-[1300px]">
              <div className="mx-5 flex text-primary-white">
                <Header />
                <main className="min-h-screen w-full">
                  <div className="flex justify-between">
                    <div className="center-size shrink-0 border-r border-border">
                      <TopBar />
                      <RequireAuth>
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
                              element={<div>FOLLOWERS</div>}
                            />
                          </Route>
                          <Route path="following">
                            <Route
                              path=":username"
                              element={<div>FOLLOWING</div>}
                            />
                          </Route>
                          <Route
                            path="people"
                            element={<DiscoverPage />}
                          ></Route>
                        </Routes>
                      </RequireAuth>
                    </div>
                    <div className="aside-size min-h-screen">
                      <aside className="flex flex-col shrink-0 min-h-screen h-full">
                        <SearchBar />
                        <div className="mt-4">
                          <NewFollowersList />
                        </div>
                      </aside>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
