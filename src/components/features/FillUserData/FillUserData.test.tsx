import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { TestingUserProvider } from '../../../testing';
import { FillUserData } from './FillUserData';
import { DUMMY_USER, EMPTY_PROFILE_USER } from '../../../testing/mocks';
import { TestingFirebaseProvider } from '../../../testing/TestingFirebaseContext';
import { UserProvider } from '../../../context';

describe('<FillUserData>', () => {
  test('should not render if no user is logged', () => {
    const { container } = render(
      <TestingUserProvider>
        <BrowserRouter>
          <FillUserData />
        </BrowserRouter>
      </TestingUserProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test('should not submit form if the fields are empty', async () => {
    const setUserProfile = jest.fn();

    render(
      <TestingUserProvider
        setUserProfile={setUserProfile}
        user={EMPTY_PROFILE_USER}
      >
        <BrowserRouter>
          <FillUserData />
        </BrowserRouter>
      </TestingUserProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const bioInput = screen.getByLabelText('bio');

    fireEvent.click(submitButton);

    expect(setUserProfile).not.toBeCalled();
    expect(nameInput).toHaveValue('');
    expect(nameInput).toHaveErrorMessage();
    expect(usernameInput).toHaveValue('');
    expect(usernameInput).toHaveErrorMessage();
    expect(bioInput).toHaveValue('');
    expect(bioInput).not.toHaveErrorMessage();
  });

  test('should store user profile data', async () => {
    const name = 'Mi nombre';
    const username = 'username';
    const bio = 'Esta es mi bio';

    const setUserProfile = jest.fn(async (user: User) => {
      expect(user.name).toBe(name);
      expect(user.username).toBe(username);
      expect(user.bio).toBe(bio);
      expect(user.email).toBe(EMPTY_PROFILE_USER.email);
      expect(user.image).toBe(EMPTY_PROFILE_USER.image);
      expect(user.id).toBe(EMPTY_PROFILE_USER.id);

      return new Promise<void>((resolve) => resolve());
    });

    const getUserProfileWithUsername = () =>
      new Promise<User | null>((resolve) => resolve(null));

    render(
      <TestingFirebaseProvider
        getUserProfileWithUsername={getUserProfileWithUsername}
      >
        <TestingUserProvider
          user={EMPTY_PROFILE_USER}
          setUserProfile={setUserProfile}
        >
          <BrowserRouter>
            <FillUserData />
          </BrowserRouter>
        </TestingUserProvider>
      </TestingFirebaseProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const bioInput = screen.getByLabelText('bio');

    userEvent.type(nameInput, name);
    userEvent.type(usernameInput, username);
    userEvent.type(bioInput, bio);

    expect(nameInput).toHaveValue(name);
    expect(usernameInput).toHaveValue(`@${username}`);
    expect(bioInput).toHaveValue(bio);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setUserProfile).toBeCalled();
    });
  });

  test('should not be able to save two users with the same username', async () => {
    const username = DUMMY_USER.username;
    const getUserProfileWithUsername = () =>
      new Promise<User | null>((resolve) => resolve(DUMMY_USER));

    render(
      <TestingFirebaseProvider
        getUserProfileWithUsername={getUserProfileWithUsername}
      >
        <TestingUserProvider user={EMPTY_PROFILE_USER}>
          <BrowserRouter>
            <FillUserData />
          </BrowserRouter>
        </TestingUserProvider>
      </TestingFirebaseProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const bioInput = screen.getByLabelText('bio');

    userEvent.type(nameInput, 'name');
    userEvent.type(usernameInput, username);
    userEvent.type(bioInput, 'bio');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usernameInput).toHaveErrorMessage('Username already taken');
    });
  });
});
