const gql = require('graphql-tag')
const util = require('./util.js')

async function addPublicFeedOrNot (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($url: String!) {
        addPublicFeedOrNot(url: $url) {
          id
          publicId
          url
          title
          subtitle
          follow
          articles(page: 1, numPerPage: 5) {
            title
            url
          }
        }
      }
    `,
    variables: {
      url: data.url
    }
  })
  return result
}

async function rename (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!, $title: String) {
        editFeed(id: $id, title: $title)
      }
    `,
    variables: {
      id: data.id,
      title: data.title
    }
  })
  return result
}

async function edit (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!, $categoryId: [String!]) {
        editFeed(id: $id, categoryId: $categoryId)
      }
    `,
    variables: {
      id: data.id,
      categoryId: data.categoryIds
    }
  })
  return result
}

async function remove (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!) {
        removeFeed(id: $id)
      }
    `,
    variables: {
      id: data.id
    }
  })
  return result
}

async function add (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($id: String!, $categoryId: String!) {
        addFeed(id: $id, categoryId: $categoryId) {
          id
        }
      }
    `,
    variables: {
      id: data.id,
      categoryId: data.categoryId
    }
  })
  return result
}

async function search (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($keyword: String!) {
        feeds(keyword: $keyword) {
          id
          publicId
          url
          title
          subtitle
          follow
          articles(page: 1, numPerPage: 5) {
            title
            url
          }
        }
      }
    `,
    variables: {
      keyword: data.keyword
    },
    fetchPolicy: 'network-only'
  })
  return result
}

export default {
  addPublicFeedOrNot: util.default.wrapper(addPublicFeedOrNot),
  add: util.default.wrapper(add),
  edit: util.default.wrapper(edit),
  remove: util.default.wrapper(remove),
  search: util.default.wrapper(search),
  rename: util.default.wrapper(rename)
}
