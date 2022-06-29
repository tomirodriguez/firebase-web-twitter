import { FC } from 'react';
import { Spinner } from '.';

type Props = {
  loading: boolean;
  onClick: () => void;
  following: boolean;
};

export const FollowButton: FC<Props> = ({ loading, onClick, following }) => {
  return (
    <button
      title={'Follow'}
      type={'button'}
      className="w-18 h-8 px-2 text-sm text-follow-black bg-follow-white transition-opacity rounded-full font-bold flex justify-center items-center hover:opacity-90 disabled:opacity-50 appearance-none focus:border-2 focus:border-blue-200 outline-none"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : 'Follow'}
    </button>
  );
};
