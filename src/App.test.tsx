import {
  render,
  screen,
  waitFor,
  prettyDOM,
  findByText,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TestingContext } from './testing';
import { EMPTY_PROFILE_USER } from './testing/mocks/users';

describe('<App>', () => {
  test('should redirect to login if no user is logged', async () => {
    render(
      <TestingContext user={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingContext>
    );

    await waitFor(() => {
      screen.getByRole('button', { name: 'Sign in with Google' });
    });

    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to login if user is logged but has no data', async () => {
    render(
      <TestingContext user={EMPTY_PROFILE_USER}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingContext>
    );

    await waitFor(() => {
      screen.getByRole('button', { name: 'Sign in with Google' });
    });

    expect(window.location.pathname).toBe('/login');
  });

  // test('should redirect to home if path is "/" an a user es logged', async () => {
  //   const { container } = render(
  //     <TestingContext>
  //       <BrowserRouter>
  //         <App />
  //       </BrowserRouter>
  //     </TestingContext>
  //   );

  //   await screen.findByText('Home');

  //   expect(window.location.pathname).toBe('/home');
  // });
});
