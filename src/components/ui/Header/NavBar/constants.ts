import { iHome, iProfile } from '../../../../icons';

type NavBarSection = {
  name: string;
  path: string;
  icon: IconPath;
  fillOnPath?: boolean;
};

export const getNavBarSections = (username: string): NavBarSection[] => [
  {
    name: 'Inicio',
    path: '/home',
    icon: iHome,
  },
  {
    name: 'Profile',
    path: '/users/' + username,
    icon: iProfile,
    fillOnPath: false,
  },
];
