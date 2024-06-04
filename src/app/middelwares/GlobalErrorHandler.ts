import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import Joi from "joi";
import { TErrorSource } from "../interface/interface";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const GlobalErrorHandler : ErrorRequestHandler = 
 (err, req, res, next: NextFunction) => {
   
    //setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    
    
    let errorSources: TErrorSource = [{
      path: '',
      message: 'Something went wrong',
    }]

    if(err?.name === "CastError"){
      const castError = handleCastError(err);

      statusCode = castError.statusCode;
      message = castError.message;
      errorSources = castError.errorSources
    }
    else if(err?.errorResponse?.code === 11000){
      const errData = handleDuplicateError(err.errorResponse);

      statusCode = errData.statusCode;
      message = errData.message;
      errorSources = errData.errorSources
    }
    else if(err instanceof AppError){

      statusCode = err?.statusCode;
      message = err?.message;
    }

    res.status(statusCode).json({
     success: false,
     message,
     errorSources,
     err
    })
 }

 export default GlobalErrorHandler;

 {/**
 {
  success
  message
  errorSources: [
    path: '',
    message: ''
  ]
 }
*/}