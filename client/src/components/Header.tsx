import React from 'react';
import { Header as SHeader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Header: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <SHeader data-testid="header" as="h1" textAlign="center" style={style}>
    <Link to="/">My app</Link>
  </SHeader>
);
