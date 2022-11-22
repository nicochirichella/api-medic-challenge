import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { validateAuthToken } from './middlewares/auth';
import logger from './utils/logger';

import { AppDataSource } from './db/data-source';

// Routes
import auth from './routes/auth';
import user from './routes/user';
import symptom from './routes/symptom';
import disease from './routes/disease';
import diagnosis from './routes/diagnosis';

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => logger.error(error));

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.use('/auth', auth);
app.use('/users', validateAuthToken, user);
app.use('/diagnosis', validateAuthToken, diagnosis);

// Routes to add symptoms and diseases (only for testing/admins)
app.use('/symptoms', symptom);
app.use('/diseases', disease);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
