const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const { connectionArgs } = require('graphql-relay');
const { nodeField } = require('./node');
const { bookType, bookConnection } = require('./types/book');
const { categoryType } = require('./types/category');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    book: {
      type: bookType,
      args: { id: { type: GraphQLString } }
    },
    category: {
      type: new GraphQLList(bookType),
      args: { id: { type: GraphQLString } }
    },
    books: {
      type: bookConnection,
      args: Object.assign({ categoryId: { type: GraphQLString } }, connectionArgs)
    },
    categories: {
      type: new GraphQLList(categoryType)
    },
    node: nodeField
  })
});

const schema = new GraphQLSchema({
  query: queryType
});

module.exports = schema;
