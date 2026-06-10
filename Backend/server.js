

import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js';
import userRouter from './routes/user.route.js';
import 'dotenv/config.js'

const port=8000;


const app = express();
app.use(express.json())
app.use(cors());



connectDB();
app.use("/api/user",userRouter);


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})