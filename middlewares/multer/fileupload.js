import multer from "multer";
import path from "path";
import checkMimeType from "../../utils/multer/checkMimeType.js";
import uploads from "../../configs/uploads.js";
import createDirectoryIfNotExists from "../../utils/multer/createDirectory.js";

const storeImage = multer.diskStorage({

    destination : (req, file, cb) => {
        const pathDirectory = `uploads/${uploads.user.image}`
        createDirectoryIfNotExists(pathDirectory)
        cb(null, pathDirectory)
    },
    filename : (req, file, cb) => {
        cb(
            null,
             file.fieldname + "_" + Date.now() + path.extname(file.originalname)
         )
    },
    
})
export const uploadImage = multer({
    storage : storeImage,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter : (req, file, cb) => {
        checkMimeType(file,cb)
    }
})

