import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components';
import { HomePage } from './pages';
import { LoginPage } from './pages/Login';
import { Header } from './views/Header';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <RequireAuth>
            <div className="bg-main-dark text-slate-100 flex flex-col">
              <div className="container mx-auto max-w-[1300px]">
                <div className="mx-5 flex text-primary-white">
                  <Header />
                  <main className="min-h-screen w-full">
                    <Routes>
                      <Route
                        path="/"
                        element={<Navigate to="/home" replace />}
                      ></Route>
                      <Route path="/home" element={<HomePage />} />
                      <Route
                        path="/about"
                        element={<div className="">ABOUT</div>}
                      />
                    </Routes>
                  </main>
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
