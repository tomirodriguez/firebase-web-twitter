import fecha from 'fecha';
import { FC } from 'react';
import { UserProfilePic } from './UserProfilePic';

type Props = {
  author: string;
  username: string;
  message: string;
  date: Date;
  image: string | undefined;
};

export const Tweet: FC<Props> = ({
  author,
  message,
  date,
  image,
  username,
}) => {
  return (
    <article className="flex border-b border-border p-5 hover:bg-opacity-5 hover:bg-white cursor-pointer">
      <div className="w-12 mr-4 mb-1 aspect-square shrink-0">
        <UserProfilePic src={image} name={author} username={username} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <h2 className="font-bold">{author}</h2>
          <span className="text-secondary-text pl-2">@{username}</span>
          <span className="text-secondary-text px-2">·</span>
          <time className="text-secondary-text">
            {fecha.format(date, 'MMM DD')}
          </time>
        </div>
        <p>{message}</p>
      </div>
    </article>
  );
};
