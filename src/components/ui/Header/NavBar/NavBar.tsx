import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoLink } from '../../LogoLink';
import { PrimaryButton } from '../../PrimaryButton';
import { getNavBarSections } from './constants';
import { NavBarItem } from './NavBarItem';
import { useUser } from '../../../../hooks/useUser';

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) return null;

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="px-3">
        <h1>
          <span hidden>WebTwitter</span>
          <LogoLink />
        </h1>
        <nav className="flex flex-col">
          {getNavBarSections(user?.username).map(
            ({ name, path, icon, fillOnPath = true }) => (
              <NavBarItem
                key={path}
                icon={icon}
                text={name}
                path={path}
                fillOnPath={fillOnPath}
              />
            )
          )}
        </nav>
        <div className="w-5/6 h-14 pt-1 my-2 text-lg ">
          <PrimaryButton title="Tweet" text="Tweet" onClick={handleClick} />
        </div>
      </div>
    </>
  );
};
