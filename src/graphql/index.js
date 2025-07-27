// graphql/index.js
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/note.schema.js';
import { resolvers } from './resolvers/note.resolver.js';

export const startGraphQLServer = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};
