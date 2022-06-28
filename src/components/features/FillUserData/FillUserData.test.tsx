import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { TestingUserProvider } from '../../../testing';
import { FillUserData } from './FillUserData';

describe('<FillUserData>', () => {
  const DEFAULT_USER: User = {
    email: 'unemail@gmail.com',
    id: '99',
    bio: '',
    name: '',
    username: '',
  };

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
      <TestingUserProvider setUserProfile={setUserProfile} user={DEFAULT_USER}>
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

  test('should submit user date when valid', async () => {
    const name = 'Mi nombre';
    const username = 'username';
    const bio = 'Esta es mi bio';

    const setUserProfile = jest.fn((user: User) => {
      expect(user.name).toBe(name);
      expect(user.username).toBe(username);
      expect(user.bio).toBe(bio);
      expect(user.email).toBe(DEFAULT_USER.email);
      expect(user.image).toBe(DEFAULT_USER.image);
      expect(user.id).toBe(DEFAULT_USER.id);

      return new Promise<void>((resolve) => resolve());
    });

    render(
      <TestingUserProvider setUserProfile={setUserProfile} user={DEFAULT_USER}>
        <BrowserRouter>
          <FillUserData />
        </BrowserRouter>
      </TestingUserProvider>
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
    expect(setUserProfile).toBeCalled();
  });
});
