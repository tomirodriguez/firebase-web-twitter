import { Tweet } from '../views/Tweet';
import { TWEETS } from '../../mock';

export const Feed = () => {
  return (
    <section>
      {TWEETS.map((val, index) => {
        return (
          <Tweet
            key={index}
            author={val.user.name}
            username={val.user.username}
            image={val.user.image}
            message={val.tweet}
            date={new Date(val.timestamp)}
          />
        );
      })}
    </section>
  );
};
