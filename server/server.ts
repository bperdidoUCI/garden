import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import connectDB from './config/db.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/auth.js';

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();