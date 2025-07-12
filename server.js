import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AuthRouter } from './src/routes/AuthRoutes.js';
import {connectDB} from './src/db/testConnection.js'
//import { UserRouter } from './src/routes/UserRoutes';
import {QueRouter} from './src/routes/QuestionRoutes.js';
import {TagRouter} from './src/routes/TagRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use(AuthRouter);
app.use(QueRouter);
app.use(TagRouter);
//app.use(UserRouter);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});