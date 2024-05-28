import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import catchAsync from '../../utils/catchAsync';



const getSingleStudent  = catchAsync( async (req, res, next) => {

    const studentId = req.params.id;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'this id student founded successfully',
      data: result,
    }) })

 

const getAllStudents = catchAsync( async (req,res, next) => {

    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: 'Students retrieve data successfully',
      data: result,
    })
} )

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'this id student deleted successfully',
      data: result,
    });

  } catch (err) {
    //send response
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Something went wrong',
    //   error: err,
    // });

    next(err)
  }
};



export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
