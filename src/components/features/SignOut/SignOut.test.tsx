import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignOut } from '.';
import { TestingUserProvider } from '../../../testing';
import { DUMMY_USER } from '../../../testing/mocks';
import { TestingFirebaseProvider } from '../../../testing/TestingFirebaseContext';

describe('<SignOut>', () => {
  test('should sign out user when clicked', () => {
    const signOutFunction = jest.fn();
    render(
      <TestingFirebaseProvider signOut={signOutFunction}>
        <TestingUserProvider user={DUMMY_USER}>
          <BrowserRouter>
            <SignOut />
          </BrowserRouter>
        </TestingUserProvider>
      </TestingFirebaseProvider>
    );

    const signOutButton = screen.getByRole('button', { name: 'Sign out' });

    fireEvent.click(signOutButton);

    expect(signOutFunction).toBeCalled();
  });
});
