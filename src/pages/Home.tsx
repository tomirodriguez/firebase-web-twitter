import { HomeMainContent } from '../views/HomeMainContent';
import { MainLayout } from '../views/MainLayout';

export const Home: React.FC = () => (
  <MainLayout mainContent={<HomeMainContent />} aside={<div>aside</div>} />
);
