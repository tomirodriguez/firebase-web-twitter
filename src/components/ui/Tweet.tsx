import { FC } from 'react';
import { User } from '../../icons/User';
import fecha from 'fecha';

type Props = {
  author: string;
  message: string;
  date: Date;
  image?: string;
};

export const Tweet: FC<Props> = ({ author, message, date, image }) => {
  return (
    <article className="flex border-b border-border p-5 hover:bg-opacity-5 hover:bg-white cursor-pointer">
      <div className="w-12 mr-4 mb-1 aspect-square shrink-0">
        {image ? (
          <img
            className="rounded-full"
            src={image}
            alt={author}
            width={48}
            height={48}
          />
        ) : (
          <User />
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <h2 className="font-bold">{author}</h2>
          <span className="text-secondary-text px-2">·</span>
          <time className="text-secondary-text">
            {fecha.format(date, 'MMM dd')}
          </time>
        </div>
        <p>{message}</p>
      </div>
    </article>
  );
};
