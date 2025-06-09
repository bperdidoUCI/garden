import express from 'express';
import { login, signup } from '../../controllers/loginController';

const app = express();

app.use(express.json());

app.post('/api/login', login);
app.post('/api/signup', signup);

app.listen(10000, () => console.log('Server running on port 10000'));
