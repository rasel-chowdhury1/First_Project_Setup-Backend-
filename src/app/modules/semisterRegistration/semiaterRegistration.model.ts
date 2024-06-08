import { Schema, model } from "mongoose";
import { TSemisterRegistration } from "./semisterRegistration.interface";
import { SemisterRegistrationStatus } from "./semisterRegistration.constrant";


const SemisterRegistrationSchema = new Schema<TSemisterRegistration>({
    academicSemister: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'AcademicSemister'
    },
    status: {
        type: String,
        enum: SemisterRegistrationStatus,
        default: "UPCOMING"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date, 
        required: true
    },
    minCredit: {
        type: Number,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 15
    },

},
{ 
    timestamps: true
})


export const SemisterRegistrationModel = model<TSemisterRegistration>("SemisterRegistration", SemisterRegistrationSchema)