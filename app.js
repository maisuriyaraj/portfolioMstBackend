import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

mongoose.set('debug',true);

app.use(express.json())
app.use(cors({
    // Send and Save Cookies to Frontend
    origin : "http://localhost:4200",
    credentials: true
}))
// TO encord URL
app.use(urlencoded({extended:true,limit:'20kb'}));
// Share Files To server
app.use(express.static("public"));
// To Parse Cookies
app.use(cookieParser());

import authRoutes from './routes/auth.routes.js';

app.use('/api/auth',authRoutes);



export default app;