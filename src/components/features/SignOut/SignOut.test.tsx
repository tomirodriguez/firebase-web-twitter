import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignOut } from '.';
import { TestingContext } from '../../../testing/TestingContext';

describe('<SignOut>', () => {
  test('should sign out user when clicked', async () => {
    const { container } = render(
      <TestingContext>
        <BrowserRouter>
          <SignOut />
        </BrowserRouter>
      </TestingContext>
    );

    const signOutButton = screen.getByRole('button', { name: 'Sign out' });

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
