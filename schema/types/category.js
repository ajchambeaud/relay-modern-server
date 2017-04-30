const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const { connectionDefinitions, globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../node');

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Represents an category of the books',
  interfaces: [nodeInterface],
  isTypeOf: obj => !!obj.label,
  fields: () => ({
    id: globalIdField(),
    label: {
      type: GraphQLString,
      description: 'Category label.'
    }
  })
});

const { connectionType: categoryConnection } = connectionDefinitions({ nodeType: categoryType });

exports.categoryType = categoryType;
exports.categoryConnection = categoryConnection;
