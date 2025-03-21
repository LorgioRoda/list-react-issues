import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import React from 'react'
import { ApolloProvider, gql} from '@apollo/client';
import { client } from './graphql/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </StrictMode>,
)