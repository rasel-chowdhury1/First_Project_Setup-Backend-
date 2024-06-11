import { NextFunction, Request, Response } from "express"


const validateRequest = (schema: any) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        
        //validation using joi
        const {error, value} = await schema.validate(req.body);

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

        // try {
        //     // validation check
        //     //if everything allright next() ->
        //     // console.log(req.body, 'req.body');
        //     await schema.parseAsync({
        //       body: req.body,
        //     });
      
        //     next();
        //   } catch (err) {
        //     next(err);
        //   }
          
    }
}

export default validateRequest;

