const gql = require('graphql-tag')
const util = require('./util.js')

async function popular (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($page: Int!, $numPerPage: Int!) {
        popularArticles(page: $page, numPerPage: $numPerPage) {
          url
          title
          published
          updated
          pictureUrl
          summary
          later
          feedId
          feedTitle
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

async function getLater (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($page: Int!, $numPerPage: Int!) {
        user {
          laterArticles(page: $page, numPerPage: $numPerPage) {
            url
            title
            published
            updated
            pictureUrl
            summary
            later
            feedId
            feedTitle
          }
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

async function getAll (data) {
  const result = await this.$apollo.query({
    query: gql`
      query($page: Int!, $numPerPage: Int!) {
        user {
          categories {
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
                summary
                later
                feedId
                feedTitle
              }
            }
          }
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

async function setLater (data) {
  const result = await this.$apollo.mutate({
    mutation: gql`
      mutation($url: String!, $feedId: String!, $later: Boolean) {
        editArticle(url: $url, feedId: $feedId, later: $later)
      }
    `,
    variables: {
      url: data.url,
      feedId: data.feedId,
      later: data.later
    }
  })
  return result
}

export default {
  popular: util.default.wrapper(popular),
  getAll: util.default.wrapper(getAll),
  getLater: util.default.wrapper(getLater),
  setLater: util.default.wrapper(setLater)
}
