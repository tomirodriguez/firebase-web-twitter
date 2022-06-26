import { FC } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { Logo } from '../Logo';
import { navBarSections } from './constants';
import { NavBarItem } from './NavBarItem';

export const NavBar: FC = () => {
  return (
    <div className="px-3">
      <h1>
        <span hidden>WebTwitter</span>
        <Logo />
      </h1>
      <nav className="flex flex-col">
        {navBarSections.map(({ name, path, icon, fillOnPath = true }) => (
          <NavBarItem
            key={path}
            icon={icon}
            text={name}
            path={path}
            fillOnPath={fillOnPath}
          />
        ))}
      </nav>
      <div className="w-5/6 h-14 pt-1 my-2 text-lg ">
        <PrimaryButton title="Tweet" text="Tweet" />
      </div>
    </div>
  );
};
