const express = require('express');
const graphqlHTTP = require('express-graphql');
const model = require('./model');
const schema = require('./schema');
const { fromGlobalId, connectionFromPromisedArray } = require('graphql-relay');
const cors = require('cors');
const app = express();

const getId = gloabalID => {
  const { id, type } = fromGlobalId(gloabalID);
  return id;
};

const creacteConnection = (promisedAray, args) => connectionFromPromisedArray(promisedAray, args);

const queryResolver = {
  book: ({ id }) => model.book.getById(getId(id)),
  catalog: {
    books: args =>
      args.categoryId
        ? creacteConnection(model.book.getByCategoryId(getId(args.categoryId)), args)
        : creacteConnection(model.book.getAll(), args),
    categories: () => model.category.getAll()
  }
};

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: queryResolver,
    graphiql: true
  })
);

app.listen(4000, function() {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
