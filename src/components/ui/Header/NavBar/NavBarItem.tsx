import { Link } from 'react-router-dom';
import Icon from '../../../../icons';
import { useIsCurrentSection } from '../../../../hooks';

type Props = {
  icon: IconPath;
  path: string;
  text: string;
  fillOnPath?: boolean;
};

export const NavBarItem: React.FC<Props> = ({
  icon,
  path = '/home',
  text,
  fillOnPath = true,
}) => {
  const isSelected = useIsCurrentSection(path);

  return (
    <Link to={path} title={text}>
      <div className="w-12 h-12 xl:w-fit xl:h-12 rounded-full xl:p-3 my-1 hover:bg-hover-white flex justify-center items-center">
        <Icon icon={icon} size={26} filled={fillOnPath ? isSelected : true} />
        {text && (
          <span
            className={`hidden xl:block ml-5 mr-4 text-xl ${
              isSelected ? 'font-bold' : ''
            }`}
          >
            {text}
          </span>
        )}
      </div>
    </Link>
  );
};
