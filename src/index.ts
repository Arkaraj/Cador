import express, { Response } from 'express';
require('dotenv-save').config();
import logger from './utils/logger';

const app = express();
app.use(express.json());
app.use(logger);

//Importing routes
import swordRoute from './server1';

//Routes
app.use('/api/swords', swordRoute);

app.get('/', (_req, res: Response) => {
  res.send('Cador Backend');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});
