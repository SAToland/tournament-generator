import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from '../server/config/mongoose.config.js';
import playerRoutes from '../server/routes/player.routes.js'

const app = express();
app.use(express.json(), cors());
app.use('/api', playerRoutes)

dotenv.config();
const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
