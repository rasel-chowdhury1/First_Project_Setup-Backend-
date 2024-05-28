import { Schema, model } from "mongoose";
import TacademicSemister, { Tmonths } from "./academicSemister.interface";

export const Months: Tmonths[] = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November','December'];

const academicSemisterSchema = new Schema<TacademicSemister>({
    name: {
        type: String,
        enum: ['Autumn','Summer','Fall'],
        required: true
    },
    code: {
        type: String,
        enum: ['01','02','03'],
        required: true
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true
    },
},
{
    timestamps: true
}) 

academicSemisterSchema.pre('save', async function(next){
    console.log(this)
    
    //find name & year exist in database.
    //coz one time create semister for each year
    const isSemisterExists = await AcademicSemisterModel.findOne({
        name: this.name,
        year: this.year
    })

    if(isSemisterExists){
        throw new Error('Semister is already exist!!!')
    }

    next()
})

export const AcademicSemisterModel = model<TacademicSemister>("AcademicSemister", academicSemisterSchema)