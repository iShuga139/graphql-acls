const connector = require('../../config/default').database.connector
const client = require('../lib/client')[connector]()

module.exports = {
  Query: {
    user: (_, { id }) => client.findById('User', id),
    users: () => client.find('User')
  },
  Mutation: {
    login: (_, { email, password }) => client.login(email, password),
    logout: (_, { accessToken }) => client.logout(accessToken),
    createUser: (_, args) => client.createUser(args),
    confirmUser: (_, { username, accessCode }) => client.confirmUser(username, accessCode),
    disableUser: (_, { id }) => client.disableUser(id),
    updatePassword: (_, { id, password }) => client.updatePassword(id, password),
    create: (_, { model, values }) => client.create(model, values),
    updateById: (_, { model, id }) => client.updateById(model, id),
    deleteById: (_, { model, id }) => client.deleteById(model, id),
  }
}
