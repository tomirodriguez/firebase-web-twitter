import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FollowInteraction } from '.';
import { TestingUserProvider } from '../../../testing';
import { DUMMY_USER } from '../../../testing/mocks';
import { TestingFirebaseProvider } from '../../../testing/TestingFirebaseContext';

describe.skip('<FollowInteraction>', () => {
  test('should be able to follow and unfollow an user', async () => {
    const userToFollow = 'an_user';
    const followingList: string[] = [];

    const isFollowing = jest.fn(async (user: string, username: string) => {
      return followingList.includes(username);
    });

    const followUser = jest.fn(async (user: User, username: string) => {
      expect(followingList).not.toContain(username);
      expect(user.followers).toBe(0);
      expect(username).toBe(userToFollow);
      followingList.push(username);
    });

    const unfollowUser = jest.fn(async (user: User, username: string) => {
      expect(followingList).toContain(username);
      expect(user.followers).toBe(1);
      expect(username).toBe(userToFollow);
      followingList.pop();
    });

    render(
      <TestingFirebaseProvider
        followUser={followUser}
        unfollowUser={unfollowUser}
        isFollowing={isFollowing}
      >
        <TestingUserProvider user={DUMMY_USER}>
          <BrowserRouter>
            <FollowInteraction username={userToFollow} />
          </BrowserRouter>
        </TestingUserProvider>
      </TestingFirebaseProvider>
    );

    const followBtn = screen.getByRole('button', { name: 'Follow' });
    fireEvent.click(followBtn);

    await waitFor(() => {
      expect(followUser).toBeCalled();
    });

    await waitFor(() => {
      expect(followBtn).not.toBeInTheDocument();
    });

    const unfollowBtn = screen.getByRole('button', { name: 'Following' });
    fireEvent.mouseOver(unfollowBtn);

    expect(unfollowBtn.textContent).toBe('Unfollow');

    fireEvent.click(unfollowBtn);

    await waitFor(() => {
      expect(unfollowUser).toBeCalled();
    });

    await waitFor(() => {
      expect(unfollowBtn).not.toBeInTheDocument();
    });

    // expect(followBtn).toBeInTheDocument();
  });
});
