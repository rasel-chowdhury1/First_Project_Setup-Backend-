// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRouter } from './app/modules/student/student.router';
import { UserRouter } from './app/modules/user/user.router';
import GlobalErrorHandler from './app/middelwares/GlobalErrorHandler';
import NotFound from './app/middelwares/NotFound';
import router from './app/routes';

//parsers
app.use(express.json());
app.use(cors());

//application routers
// app.use('/api/v1/students', StudentRouter);
// app.use('/api/v1/users', UserRouter);

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Developer!');
});

app.use(GlobalErrorHandler)

app.use(NotFound)

// console.log(process.cwd())
export default app;


