import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreLayout } from 'layouts/CoreLayout';

const App: React.FC = () => (
  <Router>
    <CoreLayout />
  </Router>
);

export default App;
