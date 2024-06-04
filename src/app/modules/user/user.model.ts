import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<Tuser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin','student','faculty']
    },
    status: {
        type: String,
        enum: ['in-progress','blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
})


//this is document middelware
// pre save middelware/hood : will work on create() save()
userSchema.pre('save', async function(next){
    // console.log("Pre hook will save user data", this);

    const user = this;
    //hashing password and save into db
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_sold_rounds) )
    next()
})

// post save middelware/hook : worked on create() save()
userSchema.post('save', function(doc, next){
    // doc.password = ''
    // console.log('post hook we saved user data -> ', this)
    next()
  })
  



export const UserModel = model<Tuser>("User", userSchema);