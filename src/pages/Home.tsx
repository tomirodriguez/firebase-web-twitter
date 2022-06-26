import { HomeAside } from '../views';
import { HomeMainContent } from '../views/Home/HomeMainContent';
import { MainLayout } from '../views/MainLayout';

export const HomePage: React.FC = () => (
  <MainLayout mainContent={<HomeMainContent />} aside={<HomeAside />} />
);
