import mongoose from "mongoose";
import { TErrorSource, TGenericsResponse } from "../interface/interface";

const handleCastError = (err: mongoose.Error.CastError) : TGenericsResponse => {
    const errorSources : TErrorSource = [{
        path: err?.path,
        message: err?.message
    }]
    
    const statusCode = 400;

    return {
        statusCode,
        message: "Invalid Id",
        errorSources
    }
}

export default handleCastError;