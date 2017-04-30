const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const { globalIdField, toGlobalId, connectionArgs, connectionFromPromisedArray } = require('graphql-relay');
const { nodeInterface } = require('../node');
const { categoryType, categoryConnection } = require('./category');
const model = require('../../model');

const bookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Represents an item in the books collection',
  interfaces: [nodeInterface],
  isTypeOf: obj => !!obj.title,
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString,
      description: 'The title of the book.'
    },
    author: {
      type: GraphQLString,
      description: 'The author of the book.'
    },
    categories: {
      type: categoryConnection,
      args: connectionArgs,
      description: 'The categories of the book.',
      resolve: (book, args) =>
        connectionFromPromisedArray(
          model.category
            .getAll()
            .then(categories => categories.filter(category => book.categories.includes(category.id))),
          args
        )
    }
  })
});

exports.bookType = bookType;
