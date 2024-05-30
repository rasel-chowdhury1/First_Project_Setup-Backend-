import { NextFunction, Request, Response } from "express"


const validateRequest = (schema: any) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const {student: studentData} = req.body;
        console.log(req.body)
        //validation using joi
        const {error, value} = await schema.validate(studentData);

        console.log({error, value})
        
        if(error){
            res.status(404).json({
                success: false,
                message: "Type validation error",
                Error: error.details
            })
        }
        else(
            next()
        )
    }
}

export default validateRequest;

