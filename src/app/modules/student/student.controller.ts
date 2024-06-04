import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import catchAsync from '../../utils/catchAsync';



const getSingleStudent  = catchAsync( async (req, res, next) => {

    const studentId = req.params.studentId;
    console.log({studentId})
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'this id student founded successfully',
      data: result,
    }) })

 

const getAllStudents = catchAsync( async (req,res, next) => {
    
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    //send response
    res.status(200).json({
      success: true,
      message: 'Students retrieve data successfully',
      data: result,
    })
} )

const updateStudent: RequestHandler = catchAsync(async (req, res, next) => {
  
  const studentId = req.params.studentId;
  const {student} = req.body;

  const result = await StudentServices.updateSingleStudentIntoDB(studentId, student);
  //send response
  res.status(200).json({
    success: true,
    message: 'this id student deleted successfully',
    data: result,
  });

}
)

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  
  const studentId = req.params.studentId;

  const result = await StudentServices.deleteStudentFromDB(studentId);
  //send response
  res.status(200).json({
    success: true,
    message: 'this id student deleted successfully',
    data: result,
  });

}
)

// const deleteStudent1: RequestHandler = async (req, res, next) => {
//   try {
//     const studentId = req.params.studentId;

//     const result = await StudentServices.deleteStudentFromDB(studentId);
//     //send response
//     res.status(200).json({
//       success: true,
//       message: 'this id student deleted successfully',
//       data: result,
//     });

//   } catch (err) {
//     //send response
//     // res.status(500).json({
//     //   success: false,
//     //   message: err.message || 'Something went wrong',
//     //   error: err,
//     // });

//     next(err)
//   }
// };



export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
