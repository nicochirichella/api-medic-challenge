import express from 'express';
import auth from './routes/auth';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"

import { AppDataSource } from './db/data-source';

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

