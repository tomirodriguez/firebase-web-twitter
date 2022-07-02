import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Authentication } from '.';

describe.skip('<Authentication>', () => {
  test('should redirect to login if no user is logged', async () => {
    const signIn = jest.fn();

    render(
      // <TestingUserProvider signIn={signIn}>
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
      // </TestingUserProvider>
    );

    const signInButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });

    fireEvent.click(signInButton);

    expect(signInButton).toBeVisible();
    expect(signIn).toBeCalled();
  });
});
