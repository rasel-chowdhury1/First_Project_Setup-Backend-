import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = async (req: Request, res: Response) => {
    try {
      
      // console.log('student file -> ',req.file);
      // console.log('student data -> ',req.body);
      //recive request body data using destructure
      const {password, student: studentData} = req.body;
  
      // // data validation using joi
      // const {error, value} = studentValidationSchema.validate(studentData);
      // //will call service funtion to sent this data
      // const result = await StudentServices.createStudentIntoDB(value);
      
      const result = await userServices.createStudentIntoDB(req.file, password, studentData);
      
  
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

  const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await userServices.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is created succesfully',
      data: result,
    });
  });
  
  const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await userServices.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });

  const getMe = catchAsync (async (req,res) => {

      const result = await userServices.getMeFromDB(req.user);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Student retrive successfully...`,
        data: result
      })
  })

  const changeStatus = catchAsync(async (req, res) => {
   const {id} = req.params;

   const result = await userServices.changeStatusIntoDB(id, req.body);

   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status updated successfully!",
    data: result
   })

  })


  export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
  }
  