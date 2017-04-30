const express = require('express');
const graphqlHTTP = require('express-graphql');
const model = require('./model');
const schema = require('./schema');
const { fromGlobalId } = require('graphql-relay');
const cors = require('cors');
const app = express();

const getId = gloabalID => {
  const { id, type } = fromGlobalId(gloabalID);
  return id;
};

const queryResolver = {
  book: ({ id }) => model.book.getById(getId(id)),
  books: () => model.book.getAll(),
  category: ({ id }) => model.book.getByCategoryId(getId(id)),
  categories: () => model.category.getAll()
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
