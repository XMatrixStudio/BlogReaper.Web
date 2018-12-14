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
          articles(1, 5) {
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

export default {
  addPublicFeedOrNot: util.default.wrapper(addPublicFeedOrNot)
}
