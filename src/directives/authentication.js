const { defaultFieldResolver } = require('graphql')
const { SchemaDirectiveVisitor } = require('graphql-tools')

const hasRoles = (userRoles, requiredRoles) =>
  requiredRoles.some(role => userRoles.indexOf(role) !== -1)


class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
    type._requiredRoles = this.args.roles
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredRoles = this.args.roles
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field

      field.resolve = async function (...args) {
        // Get the required Roles from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole = field._requiredRoles || objectType._requiredRoles

        if (!requiredRole) return resolve.apply(this, args)

        const user = args[2].user // Retrieve the user from context
        if (!hasRoles(user.roles, requiredRole)) return null

        return resolve.apply(this, args)
      }
    })
  }
}

module.exports = AuthDirective