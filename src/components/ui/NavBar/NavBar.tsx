import { FC } from 'react';
import { Button, Logo } from '..';
import { navBarSections } from './constants';
import { NavBarItem } from './NavBarItem';

export const NavBar: FC = () => {
  return (
    <div className="px-3">
      <Logo />
      <nav className="flex flex-col">
        {navBarSections.map(({ name, path, icon }) => (
          <NavBarItem icon={icon} text={name} path={path} />
        ))}
      </nav>
      <div className="w-5/6 h-14 pt-1 my-2 ">
        <Button title="Tweet">Tweet</Button>
      </div>
    </div>
  );
};
