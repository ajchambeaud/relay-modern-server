const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const model = require('../model');

const { nodeInterface, nodeField } = nodeDefinitions(globalId => {
  const { type, id } = fromGlobalId(globalId);

  return model[type.toLowerCase()].getById(id);
});

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
