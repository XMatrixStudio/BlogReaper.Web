const gql = require('graphql-tag')

async function update () {
  const result = await this.$apollo.query({
    query: gql`
      query {
        categories {
          id
          name
          feeds {
            id
            title
          }
        }
      }
    `,
    fetchPolicy: 'network-only'
  })
  console.log('update', result)
  this.$store.commit('updateCategory', result.data)
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
  update: wrapper(update),
  add: wrapper(add),
  rename: wrapper(rename)
}

function wrapper (fn) {
  return async function (data, success, failed) {
    try {
      let result = await fn.call(this, data)
      if (success !== undefined) {
        success(result)
      }
    } catch (error) {
      if (failed !== undefined) {
        failed(error)
      } else {
        this.$Notice.error({
          title: '发生错误',
          desc: error
        })
      }
    }
  }
}
