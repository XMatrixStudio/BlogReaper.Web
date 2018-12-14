const gql = require('graphql-tag')
const util = require('./util.js')

async function login (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($code: String!, $state: String!) {
        login(code: $code, state: $state) {
          email
          info {
            name
            avatar
            gender
          }
        }
      }
    `,
    variables: {
      code: data.code,
      state: data.state
    }
  })
  return result
}

async function getLogin (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation ($routeName: String!) {
        createLoginUrl(backUrl: $routeName)
      }
    `,
    variables: {
      routeName: data.routeName
    }
  })
  return result
}

async function getInfo () {
  const result = await this.$apollo.query({
    query: gql`
      query {
        user {
          email
          info {
            name
            avatar
            gender
          }
        }
      }
    `,
    fetchPolicy: 'network-only'
  })
  return result
}

async function logout () {
  await this.$apollo.mutate({
    mutation: gql`
      mutation {
        logout
      }
    `
  })
  this.$store.commit('logout')
}

export default {
  login: util.default.wrapper(login),
  getLogin: util.default.wrapper(getLogin),
  getInfo: util.default.wrapper(getInfo),
  logout: util.default.wrapper(logout)
}
