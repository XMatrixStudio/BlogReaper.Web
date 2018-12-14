const gql = require('graphql-tag')
const util = require('./util.js')

async function update () {
  const result = await this.$apollo.query({
    query: gql`
      query {
        user {
          categories {
            id
            name
            feeds {
              id
              publicId
              title
            }
          }
        }
      }
    `,
    fetchPolicy: 'network-only'
  })
  this.$store.commit('updateCategory', result.data.user)
}

async function add (name) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($name: String!) {
        addCategory(name: $name) {
          id
        }
      }
    `,
    variables: {
      name: name
    }
  })
  return result
}

async function rename (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!, $name: String!) {
        editCategory(id: $id, name: $name)
      }
    `,
    variables: {
      id: data.id,
      name: data.name
    }
  })
  return result
}

export default {
  update: util.default.wrapper(update),
  add: util.default.wrapper(add),
  rename: util.default.wrapper(rename)
}
