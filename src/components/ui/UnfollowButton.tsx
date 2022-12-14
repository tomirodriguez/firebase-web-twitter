import { FC, useState } from 'react';
import { Spinner } from '.';

type Props = {
  loading: boolean;
  onClick: () => void;
};

export const UnfollowButton: FC<Props> = ({ loading, onClick }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      title={'Unfollow'}
      type={'button'}
      className="shrink-0 w-24 h-8 px-2 text-sm text-white border-gray-400 hover:bg-error hover:bg-opacity-10 border hover:bg-transparent hover:border-error hover:text-error transition-opacity rounded-full font-bold flex justify-center items-center hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={loading}
      onClick={onClick}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {loading ? <Spinner /> : hovering ? 'Unfollow' : 'Following'}
    </button>
  );
};
