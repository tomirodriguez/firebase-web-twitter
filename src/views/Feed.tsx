import { Tweet } from '../components/ui/Tweet';

const MOCK = [
  {
    author: 'Juan',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2022, 10, 2),
  },
  {
    author: 'Carlos',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2021, 1, 15),
  },
  {
    author: 'Beto',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2020, 11, 23),
  },
  {
    author: 'Juan',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2022, 10, 2),
  },
  {
    author: 'Carlos',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2021, 1, 15),
  },
  {
    author: 'Beto',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2020, 11, 23),
  },
  {
    author: 'Juan',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2022, 10, 2),
  },
  {
    author: 'Carlos',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2021, 1, 15),
  },
  {
    author: 'Beto',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2020, 11, 23),
  },
  {
    author: 'Juan',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2022, 10, 2),
  },
  {
    author: 'Carlos',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2021, 1, 15),
  },
  {
    author: 'Beto',
    tweet:
      'Sint proident aute consectetur sit laborum eiusmod ex laborum mollit ad ipsum.',
    date: new Date(2020, 11, 23),
  },
];

export const Feed = () => {
  return (
    <section>
      {MOCK.map((val, index) => {
        return (
          <Tweet
            key={index}
            author={val.author}
            message={val.tweet}
            date={val.date}
          />
        );
      })}
    </section>
  );
};
