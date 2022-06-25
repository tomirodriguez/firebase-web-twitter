import { Link } from 'react-router-dom';
import Icon from '../../icons/Icon';
import { useIsCurrentSection } from './hooks/useIsCurrentSection';

type Props = {
  icon: IconPath;
  path: string;
  text: string;
};

export const NavBarItem: React.FC<Props> = ({ icon, path = '/home', text }) => {
  const isSelected = useIsCurrentSection(path);
  return (
    <Link to={path} title={text}>
      <div className="w-12 h-12 md:w-fit md:h-14 py-4 rounded-full md:p-3 hover:bg-hover-white flex justify-center items-center">
        <Icon icon={icon} size={26} filled={isSelected} />
        {text && (
          <span
            className={`ml-5 mr-4 text-xl ${isSelected ? 'font-bold' : ''}`}
          >
            {text}
          </span>
        )}
      </div>
    </Link>
  );
};
