import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SEO } from './components';
import { FirebaseProvider } from './context';
import { DatabaseProvider } from './context/DatabaseContext';
import { UserProvider } from './context/UserContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <FirebaseProvider>
    {/* <Provider store={store}> */}
    <DatabaseProvider>
      <UserProvider>
        <BrowserRouter>
          <SEO />
          <App />
        </BrowserRouter>
      </UserProvider>
    </DatabaseProvider>
    {/* </Provider> */}
  </FirebaseProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
