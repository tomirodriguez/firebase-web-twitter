import { ChangeEvent, FC, useRef, useState } from 'react';
import { MAX_TWEET_LENGTH } from '../../constants';
import { PrimaryButton } from '../views/PrimaryButton';
import { UserProfilePic } from '../views/UserProfilePic';

type Props = {
  user: User;
};

export const PostTweet: FC<Props> = ({ user }) => {
  const [tweet, setTweet] = useState('');
  const isTweetValid = tweet.length <= MAX_TWEET_LENGTH && tweet.length > 0;
  const tweetInput = useRef<HTMLDivElement>(null);

  const setInputFocus = () => {
    tweetInput.current?.focus();
  };

  const handleTweetChange = (event: ChangeEvent<HTMLDivElement>) => {
    setTweet(event.target.innerText);
  };

  return (
    <div>
      <div className="flex items-start">
        <div className="mr-4 shrink-0">
          <UserProfilePic src={user.image} name={user.name} />
        </div>
        <div className="grow relative">
          <div
            className="w-full grow-0 break-words outline-none text-xl pt-2"
            ref={tweetInput}
            contentEditable
            style={{
              overflow: 'wrap',
              userSelect: 'text',
              overflowWrap: 'anywhere',
            }}
            onInput={handleTweetChange}
            aria-errormessage="error-message"
            aria-invalid={!isTweetValid}
          />
          {tweet.length === 0 && (
            <span
              className="absolute text-xl top-0 pt-2 text-secondary-text"
              onClick={setInputFocus}
            >
              What's happening?
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center">
        {tweet.length > MAX_TWEET_LENGTH && (
          <p id="error-message" className="text-error text-sm mr-3">
            {MAX_TWEET_LENGTH - tweet.length}
          </p>
        )}
        <div className="w-20 h-9 text-sm">
          <PrimaryButton title="Tweet" text="Tweet" disabled={!isTweetValid} />
        </div>
      </div>
    </div>
  );
};
