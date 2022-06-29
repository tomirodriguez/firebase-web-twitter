import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignOut } from '.';
import { TestingUserProvider } from '../../../testing';
import { DUMMY_USER } from '../../../testing/mocks';
import { TestingFirebaseProvider } from '../../../testing/TestingFirebaseContext';

describe('<SignOut>', () => {
  test('should sign out user when clicked', async () => {
    const { container } = render(
      <TestingFirebaseProvider>
        <TestingUserProvider>
          <BrowserRouter>
            <SignOut />
          </BrowserRouter>
        </TestingUserProvider>
      </TestingFirebaseProvider>
    );

    const signOutButton = screen.getByRole('button', { name: 'Sign out' });

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
