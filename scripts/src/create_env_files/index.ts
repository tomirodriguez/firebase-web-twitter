import fs from 'fs';

export const createEnvFiles = () => {
  const envLocal = `REACT_APP_API_KEY=demo-local
  REACT_APP_PROJECT_ID=demo-local`;

  const envProd = `REACT_APP_API_KEY=
  REACT_APP_PROJECT_ID=
  REACT_APP_MESSAGING_SENDER_ID=
  REACT_APP_APP_ID=
  REACT_APP_MEASUREMENT_ID=`;

  fs.writeFileSync('../.env.test.local', envLocal);
  fs.writeFileSync('../.env.local', envLocal);
  fs.writeFileSync('../.env.production', envProd);
};

createEnvFiles();
