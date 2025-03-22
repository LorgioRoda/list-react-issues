import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import React from 'react'
import './index.css'
import { ApolloProvider} from '@apollo/client';
import { client } from './graphql/client';
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './theme/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
  </StrictMode>,
)