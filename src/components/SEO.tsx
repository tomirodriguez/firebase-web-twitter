import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

export const SEO: React.FC<PropsWithChildren> = ({ children }) => (
  <Helmet>
    <meta lang="en" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WebTwitter</title>
    <meta name="description" content="Challenge para Lookiero" />
    {children}
  </Helmet>
);
