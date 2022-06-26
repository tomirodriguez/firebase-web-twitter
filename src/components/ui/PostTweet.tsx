import { ChangeEvent, useRef, useState } from 'react';
import { User } from '../../icons/User';
import { PrimaryButton } from './PrimaryButton';

export const PostTweet = () => {
  const [tweet, setTweet] = useState('');
  const isTweetValid = tweet.length <= 280 && tweet.length > 0;
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
          <User size={48} />
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
        {tweet.length > 280 && (
          <p id="error-message" className="text-error text-sm mr-3">
            {280 - tweet.length}
          </p>
        )}
        <div className="w-20 h-9 text-sm">
          <PrimaryButton title="Tweet" text="Tweet" disabled={!isTweetValid} />
        </div>
      </div>
    </div>
  );
};
