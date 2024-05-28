import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response) => {
    try {
  
      //recive request body data using destructure
      const {password, student: studentData} = req.body;
  
      // // data validation using joi
      // const {error, value} = studentValidationSchema.validate(studentData);
      // //will call service funtion to sent this data
      // const result = await StudentServices.createStudentIntoDB(value);
      
      const result = await userServices.createStudentIntoDB(password, studentData);
  
    //  if(error){
    //   //send response
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
  
    //  }
  
      //send response
      // res.status(200).json({
      //   success: true,
      //   message: 'A student created successfully',
      //   data: result,
      // });

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A student created successfully",
        data: result
      })
  
    } catch (error: any) {
      //send response
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
    
  };


  export const userController = {
    createStudent,
  }
  