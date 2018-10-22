const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
    app.listen(8080);
  });