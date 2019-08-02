// const { database } = require('../config/default')
// const pgClient = require('./connector')(database)

/**
 * V1: simple actions retrieving data from mock objects
 * V2: TODO
 * - replace mocks for real connection to PG
 * - complete the standard CRUD actions
 * - dockerize DBs and Application
 */

const mocks = require('../mocks/index')

const login = (email, password) => {
  console.log('WORKING WITH POSTGRES, YEAH RIGHT!!!')
  const Users = mocks.User

  const usr = Users.find(user =>
    user.email === email && user.password == password && user.active
  )

  return { token: mocks.AccessToken[usr.id].token }
}

const logout = (accessToken) => { }

const createUser = ({
  username, password, email, emailVerified, roles
}) => { }

const getUserByToken = (accessToken) => {
  const accessTokenInfo = mocks.AccessToken[accessToken.slice(-1)]
  const user = mocks.User.find(user => user.id == accessTokenInfo.userId)

  return { username: user.username, roles: user.roles }
}

const create = (model, values) => {
  console.log(`Created on ${model} model with values [${values}]`)
}

const confirmUser = (username, accessCode) => { }
const disableUser = (id) => { }
const updatePassword = (id, password) => { }

const findById = (model, id) => mocks[model].find(obj => obj.id == id)

const find = (model, whereClause) => { }
const updateById = (model, id) => { }
const deleteById = (model, id) => { }

module.exports = {
  login,
  logout,
  createUser,
  getUserByToken,
  confirmUser,
  disableUser,
  updatePassword,
  create,
  findById,
  find,
  updateById,
  deleteById,
}
