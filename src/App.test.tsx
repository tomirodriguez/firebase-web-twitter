import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DUMMY_USER } from './mock';
import { TestingUserContext } from './testing/TestingUserContext';

describe('<App>', () => {
  test('should redirect to login if no user is logged', async () => {
    render(
      <TestingUserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserContext>
    );

    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to home if path is "/"', async () => {
    render(
      <TestingUserContext user={DUMMY_USER}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserContext>
    );

    expect(window.location.pathname).toBe('/home');
  });
});
