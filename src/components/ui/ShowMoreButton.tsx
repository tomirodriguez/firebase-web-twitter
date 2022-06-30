import { FC } from 'react';
type Props = {
  onShowMore: () => void;
};
export const ShowMoreButton: FC<Props> = ({ onShowMore }) => {
  return (
    <button
      onClick={onShowMore}
      className="w-full py-4 text-primary-blue hover:bg-hover-white"
    >
      Show more
    </button>
  );
};
