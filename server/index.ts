import { ApolloServer } from 'apollo-server';
import mongoose, { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers/index.resolver';
import { MONGODB } from './config';

dotenv.config();

const filename = process.env.ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: filename });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('MongoDB Connected');
    console.log('Δ', { port: process.env.DB_PORT });
    return server.listen({ port: process.env.DB_PORT });
  })
  .then((res) => {
    console.log(`🚀 Server running at ${res.url}`);
  });
