import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { nanoid } from "nanoid";
import path from 'path';
import fs from 'fs'
export const fileType={
    image:['image/apng' , 'image/jpeg' , 'image/png'],
    video:[]
}
Object.freeze(fileType)

export const uploadFile = (type ) => {    
    const storage = multer.diskStorage({
        // destination:(req , file , cb)=>{
        //     const folderPath = path.resolve('.' ,`${folder}/${req.user._id}`);
        //     if(!fs.existsSync(folderPath)){
        //         fs.mkdirSync(folderPath , {recursive:true})
        //     }
        //     cb(null , folderPath)
        // },
        // filename: (req, file, cb) => {                        
        //     cb(null, `${nanoid(10)}_${file.originalname}`);
        //     console.log({ file });
        // }
    });
    const fileFilter = (req , file , cb)=>{
        if(type.includes(file.mimetype)){
            return cb(null , true)
        }
        return cb(new Error('invalid type' ,{cause:StatusCodes.BAD_REQUEST}) , false);
    }

    const upload = multer({ storage , fileFilter });    
    return upload;
};
