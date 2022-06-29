import { SignOut } from '../../features/SignOut';
import { NavBar } from './NavBar';

export const Header = () => (
  <header className="sticky top-0 header-size h-screen flex flex-col shrink-0 border-r border-border justify-between">
    <NavBar />
    <SignOut />
  </header>
);
