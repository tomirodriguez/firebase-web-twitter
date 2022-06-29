import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TestingUserProvider } from './testing';
import { DUMMY_USER, EMPTY_PROFILE_USER } from './testing/mocks';

describe('<App>', () => {
  test('should redirect to login if no user is logged', async () => {
    render(
      <TestingUserProvider user={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserProvider>
    );

    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to login if user is logged but has no data', async () => {
    render(
      <TestingUserProvider user={EMPTY_PROFILE_USER}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserProvider>
    );

    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to home if path is "/"', async () => {
    render(
      <TestingUserProvider user={DUMMY_USER}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserProvider>
    );

    expect(window.location.pathname).toBe('/home');
  });
});
