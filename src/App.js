import React from 'react';
import { Router } from 'react-router-dom';
import './App.css'
import Routes from './routes';
import history from './history';

import { AuthProvider } from './Context/AuthContext';

import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  
})

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
