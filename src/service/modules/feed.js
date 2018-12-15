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
      mutation($id: String!, $categoryIds: [String!]) {
        editFeed(id: $id, categoryIds: $categoryIds)
      }
    `,
    variables: {
      id: data.id,
      categoryIds: data.categoryIds
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

async function getById (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($feedId: String!) {
        user {
          categories {
            name
            feeds(id: $feedId) {
              id
              title
              articles {
                title
              }
            }
          }
        }
      }
    `,
    variables: {
      feedId: data.feedId
    },
    fetchPolicy: 'network-only'
  })
  return result
}

async function popular (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($page: Int!, $numPerPage: Int!) {
        popularFeeds(page: $page, numPerPage: $numPerPage) {
          publicId
          title
          url
        }
      }
    `,
    variables: {
      page: data.page,
      numPerPage: data.numPerPage
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
  rename: util.default.wrapper(rename),
  getById: util.default.wrapper(getById),
  popular: util.default.wrapper(popular)
}
