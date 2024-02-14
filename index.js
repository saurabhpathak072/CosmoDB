import express from 'express';
import {config} from 'dotenv';
import { connectMongoDB } from './config/db.js';
import postRouter from './server/router/post.js'
import chalk from 'chalk';

config();
connectMongoDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/app/api',postRouter)


app.listen(PORT,()=>{
    console.log(chalk.yellow.italic.bold(`Server running at PORT ${PORT}`));
})
