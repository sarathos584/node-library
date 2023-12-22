import { Router } from "express";
import { test } from "../../../controllers/test/test.js";
import { uploadImage } from "../../../middlewares/multer/fileupload.js";
import { uploadSingleImage } from "../../../controllers/v1/fileupload/fileuploadController.js";

const router = Router()

router.get("/",test)

router.post("/upload/image",uploadImage.single("image"),uploadSingleImage)



export default router