import { iExplore, iHome, iProfile } from '../../../../icons';

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
    name: 'Discover',
    path: '/people',
    icon: iExplore,
    fillOnPath: false,
  },
  {
    name: 'Profile',
    path: '/users/' + username,
    icon: iProfile,
    fillOnPath: false,
  },
  {
    name: 'Followers',
    path: '/followers/' + username,
    icon: iProfile,
    fillOnPath: false,
  },
  {
    name: 'Following',
    path: '/following/' + username,
    icon: iProfile,
    fillOnPath: false,
  },
];
