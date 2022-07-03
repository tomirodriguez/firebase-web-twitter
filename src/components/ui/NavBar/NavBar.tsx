import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoLink } from '../LogoLink';
import { PrimaryButton } from '../PrimaryButton';
import { getNavBarSections } from './constants';
import { NavBarItem } from './NavBarItem';
import { useUser } from '../../../hooks/useUser';
import Icons, { iPen } from '../../../icons';

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user) return null;

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="lg:px-3 flex flex-col items-center lg:items-start">
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
        <div className="w-[50px] h-[50px] xl:w-5/6 xl:h-14 xl:pt-1 my-2 text-lg aspect-square">
          <PrimaryButton
            title="Tweet"
            text={
              <div>
                <span className="xl:hidden flex justify-center">
                  <Icons icon={iPen} />
                </span>
                <span className="hidden xl:block">Tweet</span>
              </div>
            }
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};
