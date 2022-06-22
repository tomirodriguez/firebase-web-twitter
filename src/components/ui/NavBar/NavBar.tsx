import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '..';
import { Logo, Home } from '../../icons';
import { NavBarItem } from './NavBarItem';

export const NavBar: FC = () => {
  const { pathname } = useLocation();
  return (
    <div className="px-3">
      <NavBarItem icon={<Logo size={30} color="#D6D9DB" />} />
      <nav className="flex flex-col">
        <NavBarItem
          icon={<Home size={26} filled={pathname === '/home'} />}
          text={'Home'}
          selected={pathname === '/'}
        />
        <NavBarItem
          icon={<Home size={26} filled={pathname === '/about'} />}
          text={'About'}
          link="about"
          selected={pathname === '/about'}
        />
      </nav>
      <div className="w-5/6 h-14 pt-1 my-2 ">
        <Button title="Tweet">Tweet</Button>
      </div>
    </div>
  );
};
