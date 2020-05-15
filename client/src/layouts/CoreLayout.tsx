import React from 'react';
import { Header } from 'components/Header';
import { getRoutes } from './routes';

export const CoreLayout: React.FC<{}> = () => {
  const routes = getRoutes(false);
  return (
    <>
      <Header style={{ marginTop: '2rem' }} />
      {routes}
    </>
  );
};
