// import pkg from '@apollo/client'
// import fetch from 'cross-fetch'
const pkg = require('@apollo/client')
const fetch = require('cross-fetch')
const { ApolloClient, InMemoryCache, HttpLink, ApolloLink } = pkg
const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev/', fetch })

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token')
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

module.exports = apolloClient
