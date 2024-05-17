// const express = require('express')
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRouter } from './app/modules/student/student.router';

//parsers
app.use(express.json());
app.use(cors());

//application routers
app.use('/api/v1/students', StudentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Developer!');
});

// console.log(process.cwd())
export default app;
