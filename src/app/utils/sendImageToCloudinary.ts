import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import fs from "fs";


// Configuration
cloudinary.config({ 
    cloud_name: 'dl0vrr3sr', 
    api_key: '478352269598299', 
    api_secret: 'RGyp8-aCDBSU4zWAzhPmHpeADAM' // Click 'View Credentials' below to copy your API secret
});


export const sendImageToCloudinary = async (imageName: string, path: string) => {
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           path, {
               public_id: imageName,
           }
       )
       .catch((error) => {
           throw new AppError(httpStatus.NOT_FOUND, error)
       });

       fs.unlink(path, function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed successfully`);
        }
    });

       return uploadResult;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })