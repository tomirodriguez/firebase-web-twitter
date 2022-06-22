import { Feed, MainLayout } from '../views';

export const Home: React.FC = () => (
  <MainLayout mainContent={<Feed />} aside={<div>aside</div>} />
);
