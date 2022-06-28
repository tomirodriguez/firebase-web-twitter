import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DUMMY_USER } from './mock';
import { TestingUserProvider } from './testing';
import App from './App';

describe('<App>', () => {
  test('should redirect to login if no user is logged', async () => {
    render(
      <TestingUserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestingUserProvider>
    );

    expect(window.location.pathname).toBe('/login');
  });

  test('should redirect to login if user is logged but has no data', async () => {
    render(
      <TestingUserProvider
        user={{
          email: 'anemail@gmail.com',
          name: '',
          bio: '',
          username: '',
          id: '99',
        }}
      >
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
