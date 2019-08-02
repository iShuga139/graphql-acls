const { gql } = require('apollo-server')

module.exports = gql`
  directive @auth(roles: [Role]) on OBJECT | FIELD_DEFINITION

  scalar Date

  enum Role {
    USER
    ADMIN
    VIEWER
    ANONYMOUS
  }

  type User @auth(roles: [USER]) {
    id: String @auth(roles: [ADMIN])
    username: String @auth(roles: [USER, VIEWER])
    password: String
    email: String
    emailVerified: Boolean
    roles: [Role] @auth(roles: [ADMIN])
    active: Boolean @auth(roles: [ADMIN])
  }

  type AccessToken {
    id: String
    token: String!
    createdAt: Date
    userId: String
  }

  type Query {
    user(id:String): User @auth(roles: [USER, ADMIN])
    users: [User] @auth(roles: [ADMIN])
  }

  type Generic {
    id: String!
  }

  type Mutation {
    login(email: String, password: String): AccessToken
    logout(accessToken: String): AccessToken @auth(roles: [USER])
    createUser(
      username: String, password: String,
      email: String, roles: [Role],
      emailVerified: Boolean
    ): User @auth(roles: [ADMIN])
    confirmUser(username: String, accessCode: String): User
    disableUser(id: String): User @auth(roles: [ADMIN])
    updatePassword(id: String, password: String): User @auth(roles: [USER, ADMIN])
    create(model: String, values: [String]): Generic @auth(roles: [USER])
    updateById(model: String, id: String): Generic @auth(roles: [USER])
    deleteById(model: String, id: String): Generic @auth(roles: [USER])
  }
`
