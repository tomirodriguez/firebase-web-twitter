import { ChangeEvent, FC, useRef, useState, SyntheticEvent } from 'react';
import { MAX_TWEET_LENGTH } from '../../constants';
import { PrimaryButton } from '../ui/PrimaryButton';
import { UserProfilePic } from '../ui/UserProfilePic';
import { useUser } from '../../hooks/useUser';
import { Spinner } from '../ui';

export const PostTweet: FC = () => {
  const [loading, setLoading] = useState(false);
  const [tweetToPost, setTweetToPost] = useState('');
  const { user, tweet } = useUser();

  const tweetInput = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const { image, name, username } = user;

  const isTweetValid =
    tweetToPost.length <= MAX_TWEET_LENGTH && tweetToPost.length > 0;

  const setInputFocus = () => {
    tweetInput.current?.focus();
  };

  const handleTweetChange = (event: ChangeEvent<HTMLDivElement>) => {
    setTweetToPost(event.target.innerText);
  };

  const handleTweetSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    tweet(tweetToPost)
      .then(() => setTweetToPost(''))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleTweetSubmit}>
      <div className="flex items-start">
        <div className="mr-4 shrink-0">
          <UserProfilePic src={image} name={name} username={username} />
        </div>
        {loading ? (
          <Spinner />
        ) : (
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
              title="Tweet"
              aria-errormessage="error-message"
              aria-invalid={!isTweetValid}
            />
            {tweetToPost.length === 0 && (
              <span
                className="absolute text-xl top-0 pt-2 text-secondary-text"
                onClick={setInputFocus}
              >
                What's happening?
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        {tweetToPost.length > MAX_TWEET_LENGTH && (
          <p id="error-message" className="text-error text-sm mr-3">
            {MAX_TWEET_LENGTH - tweetToPost.length}
          </p>
        )}
        <div className="w-20 h-9 text-sm">
          <PrimaryButton
            title="Tweet"
            text="Tweet"
            disabled={!isTweetValid}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
