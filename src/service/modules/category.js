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

async function remove (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!) {
        removeCategory(id: $id)
      }
    `,
    variables: {
      id: data.id
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

async function getById (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($id: String!, $page: Int!, $numPerPage: Int!) {
        user {
          categories (id: $id) {
            name
            feeds {
              id
              publicId
              title
              articles(page: $page, numPerPage: $numPerPage) {
                url
                title
                published
                pictureUrl
                updated
                content
                later
                summary
                feedId
                feedTitle
              }
            }
          }
        }
      }
    `,
    variables: {
      id: data.id,
      page: data.page,
      numPerPage: data.numPerPage
    },
    fetchPolicy: 'network-only'
  })
  return result
}

export default {
  update: util.default.wrapper(update),
  add: util.default.wrapper(add),
  rename: util.default.wrapper(rename),
  remove: util.default.wrapper(remove),
  getById: util.default.wrapper(getById)
}
