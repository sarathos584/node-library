import { validationResult } from "express-validator"
import HttpError from "../../../utils/httpError.js"
import getFilePath from "../../../utils/multer/getFilePath.js";

export const uploadSingleImage = async (req, res, next) => {
    try {
       const errors =  validationResult(req)
       if (! errors.isEmpty()) {
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
      } else {
        const imagePath = getFilePath(req.file.path)
        if (! imagePath) {
            return next(new HttpError("Cannot find image path",404))
        } else {
            res.json({
                status : true,
                message : '',
                data : imagePath
            })
        }
      }
    } catch (error) {
        console.log(error)
        return next(new HttpError("Oops! Process failed, Please do contact admin",500))
    }
} 