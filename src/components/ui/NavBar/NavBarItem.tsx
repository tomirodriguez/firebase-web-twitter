import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  icon: ReactElement<Icon>;
  selected?: boolean;
  link?: string;
  text?: string;
};

export const NavBarItem: React.FC<Props> = ({
  icon,
  link = '/home',
  text,
  selected = 'false',
}) => {
  return (
    <Link to={link}>
      <div className="w-12 h-12 md:w-fit md:h-14 py-4 rounded-full md:p-3 hover:bg-hover-white flex justify-center items-center">
        {icon}
        {text && (
          <span className={`ml-5 mr-4 text-xl ${selected ? 'font-bold' : ''}`}>
            {text}
          </span>
        )}
      </div>
    </Link>
  );
};
