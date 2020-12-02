import express from 'express';

import { connectDb } from './config/db.js';

const app = express();
connectDb();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
