
import { NextFunction, Request, Response } from "express";

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: 'error'
    })
}

export default NotFound;