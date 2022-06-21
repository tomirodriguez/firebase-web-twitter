import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="h-screen bg-blue-300">
      <Helmet>
        <meta lang="en" />
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WebTwitter</title>
        <meta name="description" content="Challenge para Lookiero" />
      </Helmet>
      <header></header>
    </div>
  );
}

export default App;
