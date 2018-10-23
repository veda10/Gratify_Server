const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
import models from './models';

const server = new ApolloServer({ typeDefs, resolvers, context: {models, user: {id:1,}} });

const app = express();
app.use(cors('*'));
server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
    app.listen(8080);
  });