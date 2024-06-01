import { NextFunction, Request, Response } from "express"

const GlobalErrorHandler = 
 (err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
     success: false,
     message: err.message || "Something went wrong",
     error: err
    })
 }

 export default GlobalErrorHandler;