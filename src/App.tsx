import { Navigate, Route, Routes } from 'react-router-dom';
import { SEO } from './components/SEO';
import { Home } from './pages/Home';
import { Header } from './views/Header';

function App() {
  return (
    <div className="bg-main-dark text-slate-100 flex flex-col">
      <SEO />
      <div className="container mx-auto max-w-[1320px]">
        <div className="mx-5 flex text-primary-white">
          <Header />
          <main className="min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />}></Route>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<div className="">ABOUT</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
