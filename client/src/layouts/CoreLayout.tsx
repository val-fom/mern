import React from 'react';
import { Header } from 'components/Header';
import { Container } from 'semantic-ui-react';
import { getRoutes } from './routes';

export const CoreLayout: React.FC<{}> = () => {
  const routes = getRoutes(false);
  return (
    <Container>
      <Header style={{ marginTop: '2rem' }} />
      {routes}
    </Container>
  );
};
