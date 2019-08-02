// using apollo-server 2.x
const { ApolloServer } = require('apollo-server')

const typeDefs = require('./src/models/index')
const resolvers = require('./src/resolvers/index')

const AuthDirective = require('./src/directives/authentication')

const connector = require('./config/default').database.connector
const { getUserByToken } = require('./src/lib/client')[connector]()

const server = new ApolloServer({
  typeDefs,
  schemaDirectives: { auth: AuthDirective },
  resolvers,
  context: ({ req }) => { // middleware
    const method = req.headers.method
    if (method && method === 'login') return {}

    const token = req.headers.authorization
    if (!token) throw new Error('401-Unauthorized')

    const user = getUserByToken(token)
    if (!user) throw new Error('You must be logged in')

    return { user } // add the user to the context
  },
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))