import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FollowInteraction } from '.';
import { TestingUserProvider } from '../../../testing';
import { DUMMY_USER } from '../../../testing/mocks';
import { TestingFirebaseProvider } from '../../../testing/TestingFirebaseContext';

describe('<FollowInteraction>', () => {
  test('should be able to follow and unfollow an user', async () => {
    const userToFollow = 'an_user';

    render(
      <TestingFirebaseProvider>
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
      expect(followBtn).not.toBeInTheDocument();
    });

    const unfollowBtn = screen.getByRole('button', { name: 'Following' });
    fireEvent.mouseOver(unfollowBtn);

    expect(unfollowBtn.textContent).toBe('Unfollow');

    fireEvent.click(unfollowBtn);
    await waitFor(() => {
      expect(unfollowBtn).not.toBeInTheDocument();
    });

    const newFollowBtn = screen.getByRole('button', { name: 'Follow' });
    expect(newFollowBtn).toBeInTheDocument();
  });
});
