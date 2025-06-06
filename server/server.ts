import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/auth.js';

import logger from './middleware/logger.js';

import favoriteRoutes from './routes/api/favoritesRoutes.js';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

config();
const app = express();
const PORT = process.env.PORT || 4000;app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use('/api/favorites', favoriteRoutes);const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });  connectDB();
  app.listen(PORT, () => {
    console.log(`:rocket: Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();

/*
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/auth.js';


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(logger);
app.use(cors());
app.use(express.json());
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
*/
