import { Link } from 'react-router-dom';

export const TopBar = () => {
  return (
    <div
      className="sticky top-0 h-14 py-1 px-4 flex items-center bg-blur transition-none"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <Link to="/home" className="w-full h-full flex items-center">
        <h2 className="font-bold text-xl">Home</h2>
      </Link>
    </div>
  );
};
