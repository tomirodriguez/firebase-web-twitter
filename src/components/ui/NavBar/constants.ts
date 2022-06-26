import { iExplore, iHome } from '../../../icons';

type NavBarSection = {
  name: string;
  path: string;
  icon: IconPath;
  fillOnPath?: boolean;
};

export const navBarSections: NavBarSection[] = [
  {
    name: 'Inicio',
    path: '/home',
    icon: iHome,
  },
  {
    name: 'Explorar',
    path: '/explorar',
    icon: iExplore,
    fillOnPath: false,
  },
  {
    name: 'Notificaciones',
    path: '/notificaciones',
    icon: iHome,
  },
  {
    name: 'Mensajes',
    path: '/mensajes',
    icon: iHome,
  },
  {
    name: 'Guardados',
    path: '/guardados',
    icon: iHome,
  },
  {
    name: 'Listas',
    path: '/listas',
    icon: iHome,
  },
  {
    name: 'Perfil',
    path: '/perfil',
    icon: iHome,
  },
];
