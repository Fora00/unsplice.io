import { ApolloServer } from 'apollo-server';
import mongoose, { ConnectOptions } from 'mongoose';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers/index.resolver';
import { MONGODB } from './config';

const PORT = 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
  });
