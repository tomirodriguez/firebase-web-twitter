import {
  fireEvent,
  render,
  screen,
  waitFor,
  prettyDOM,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Authentication } from '.';
import { EMPTY_PROFILE_USER, DUMMY_USER } from '../../../testing/mocks/users';
import { TestingContext } from '../../../testing/TestingContext';
import {
  INVALID_EMPTY_NAME,
  INVALID_EMPTY_USERNAME,
  USERNAME_TAKEN,
} from './errors';

describe('<Authentication>', () => {
  test('should be able to sign in with Google', async () => {
    render(
      <TestingContext user={null}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </TestingContext>
    );

    const signInButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });

    let userProfileComponent = screen.queryByText('We want to know you better');
    expect(userProfileComponent).not.toBeInTheDocument();

    fireEvent.click(signInButton);

    userProfileComponent = screen.getByText('We want to know you better');
    expect(userProfileComponent).toBeInTheDocument();
  });

  test.skip('should be able to set an user profile', async () => {
    const name = 'A name';
    const username = 'an_username';
    const bio = 'This is my bio';

    const { container } = render(
      <TestingContext user={EMPTY_PROFILE_USER}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </TestingContext>
    );

    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const bioInput = screen.getByLabelText('bio');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(nameInput, name);
    userEvent.type(usernameInput, username);
    userEvent.type(bioInput, bio);

    fireEvent.click(submitButton);

    prettyDOM();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  test('should not be able to set an user profile without name or username', async () => {
    render(
      <TestingContext user={EMPTY_PROFILE_USER}>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </TestingContext>
    );

    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    expect(nameInput).toHaveErrorMessage(INVALID_EMPTY_NAME);
    expect(usernameInput).toHaveErrorMessage(INVALID_EMPTY_USERNAME);
  });

  test('should not be able to create a user with duplicate username', async () => {
    render(
      <TestingContext
        user={EMPTY_PROFILE_USER}
        usersDatabaseInitialState={[DUMMY_USER]}
      >
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </TestingContext>
    );

    const nameInput = screen.getByLabelText('name');
    const usernameInput = screen.getByLabelText('username');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(nameInput, 'Un Nombre');
    userEvent.type(usernameInput, DUMMY_USER.username);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usernameInput).toHaveErrorMessage(USERNAME_TAKEN);
    });
  });
});
