import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/auth.js';
import logger from './middleware/logger.js';
import favoriteRoutes from './routes/api/favoritesRoutes.js';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import { login, signup } from './controllers/loginController.js';

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Server Port
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(cors());
app.use(logger);
app.use(express.json());

// Todas rotas da API
app.use(authMiddleware);
app.use('/api', router);
app.post('/api/login', login);
app.post('/api/signup', signup);
app.use('/api/favorites', favoriteRoutes);

// Serve o frontend SPA no final (após rotas de API)
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

const startServer = async () => {
  try {
    await connectDB();
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
