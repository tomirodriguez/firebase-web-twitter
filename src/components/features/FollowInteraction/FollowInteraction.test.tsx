import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FollowInteraction } from '.';
import { DUMMY_USER, OTHER_DUMMY_USER } from '../../../testing/mocks/users';
import { TestingContext } from '../../../testing/TestingContext';

describe('<FollowInteraction>', () => {
  test('should be able to follow an user', async () => {
    const userToFollow = OTHER_DUMMY_USER.username;

    const userDb = [DUMMY_USER, OTHER_DUMMY_USER];

    render(
      <TestingContext usersDatabaseInitialState={userDb}>
        <BrowserRouter>
          <FollowInteraction username={userToFollow} />
        </BrowserRouter>
      </TestingContext>
    );

    const followBtn = screen.getByRole('button', { name: 'Follow' });
    expect(followBtn).toBeInTheDocument();
    fireEvent.click(followBtn);

    await waitForElementToBeRemoved(followBtn);

    const unfollowBtn = screen.getByRole('button', { name: 'Following' });
    expect(unfollowBtn).toBeInTheDocument();
  });

  test('should be able to unfollow an user', async () => {
    const userToFollow = OTHER_DUMMY_USER.username;

    const userDb: User[] = [
      { ...DUMMY_USER, following: 1 },
      { ...OTHER_DUMMY_USER, followers: 1 },
    ];
    const followDb: Follow[] = [
      {
        followUsername: OTHER_DUMMY_USER.username,
        id: '1',
        timestamp: new Date(),
        username: DUMMY_USER.username,
      },
    ];

    render(
      <TestingContext
        usersDatabaseInitialState={userDb}
        followsDatabaseInitialState={followDb}
      >
        <BrowserRouter>
          <FollowInteraction username={userToFollow} />
        </BrowserRouter>
      </TestingContext>
    );

    const followBtn = screen.getByRole('button', { name: 'Follow' });
    await waitForElementToBeRemoved(followBtn);

    const unfollowBtn = screen.getByRole('button', { name: 'Following' });
    expect(unfollowBtn).toBeInTheDocument();
    fireEvent.click(unfollowBtn);

    await waitForElementToBeRemoved(unfollowBtn);

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });
});
