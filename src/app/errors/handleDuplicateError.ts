import { TErrorSource, TGenericsResponse } from "../interface/interface";

const handleDuplicateError = (err: any): TGenericsResponse => {
    const match = err.errmsg.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources: TErrorSource = [
        {
            path: '',
            message: `${extractedMessage} is a already exists.`
        }
    ]
    
    const statusCode = 400;

    return {
        statusCode,
        message: "Duplicate Value",
        errorSources
    }


}

export default handleDuplicateError;