import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    //recive request body data using destructure
    const {student: studentData} = req.body;

    // // data validation using joi
    // const {error, value} = studentValidationSchema.validate(studentData);
    // //will call service funtion to sent this data
    // const result = await StudentServices.createStudentIntoDB(value);
    
    const result = await StudentServices.createStudentIntoDB(studentData);

  //  if(error){
  //   //send response
  //   res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong',
  //     error: error.details,
  //   });

  //  }

    //send response
    res.status(200).json({
      success: true,
      message: 'A student created successfully',
      data: result,
    });

  } catch (error: any) {
    //send response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: 'Students retrieve data successfully',
      data: result,
    });
  } catch (error: any) {
    //send response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'this id student founded successfully',
      data: result,
    });
  } catch (err: any) {
    //send response
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'this id student deleted successfully',
      data: result,
    });

  } catch (err: any) {
    //send response
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};



export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
