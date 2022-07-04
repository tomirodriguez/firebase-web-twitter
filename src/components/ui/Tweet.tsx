import fecha from 'fecha';
import { FC, useCallback } from 'react';
import { UserProfilePic } from './UserProfilePic';

type Props = {
  author: string;
  username: string;
  message: string;
  date: Date;
  image: string | undefined;
};
const MS_TO_MINUTES = 1000 * 60;

export const Tweet: FC<Props> = ({
  author,
  message,
  date,
  image,
  username,
}) => {
  const getDateFormat = useCallback(() => {
    const timeDifference = Math.floor(
      (new Date().getTime() - date.getTime()) / MS_TO_MINUTES
    );

    if (timeDifference === 0) return 'Just now';
    if (timeDifference < 60) return `${timeDifference}m`;
    if (timeDifference < 60 * 24) return `${Math.floor(timeDifference / 24)}h`;

    return fecha.format(date, 'MMM DD');
  }, [date]);

  return (
    <article className="flex border-b border-border p-5 hover:bg-opacity-5 hover:bg-white cursor-pointer">
      <div className="w-12 mr-4 mb-1 aspect-square shrink-0">
        <UserProfilePic src={image} name={author} username={username} />
      </div>
      <div className="flex flex-col w-full">
        <div className="md:flex">
          <div className="flex md:block justify-between md:justify-start items-center">
            <h2 className="font-bold">{author}</h2>
            <time className="text-secondary-text md:hidden">
              {getDateFormat()}
            </time>
          </div>
          <div className="flex">
            <span className="text-secondary-text md:pl-2">@{username}</span>
            <span className="hidden md:block text-secondary-text md:px-2">
              ·
            </span>
          </div>
          <time className="hidden md:block text-secondary-text">
            {getDateFormat()}
          </time>
        </div>
        <p>{message}</p>
      </div>
    </article>
  );
};
