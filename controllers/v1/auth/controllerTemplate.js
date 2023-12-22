import { validationResult } from "express-validator";
import TestUser from "../../../models/testUser";
import HttpError from "../../../utils/httpError";


export const emptyTemplate = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (! errors.isEmpty()) {
      return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
    } else {

      /* controller logics should be defined here */
      
    }
  } catch (error) {
    return next(new HttpError("Oops! Process failed, please do contact admin", 500));
  }
}



export const loginTemplate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
      return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
    } else {
       const { email, password } = req.body
       /**
        * TestUser should be replaced with desired collection name
        */
       const user = await TestUser.findOne({ email : email })
       if (! user) {
        return next(new HttpError("Invalid credentials",400))
       } else {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (! isValidPassword) {
         return next(new HttpError("Invalid credentials",400))
        } else {
            const token = jwt.sign({ userId : user.user_id, userEmail : user.email}, process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_TOKEN_EXPIRY }
              );
            res.status(200).json({
              status : true,
              message : '',
              access_token : token
            })
        }
       }
    }
  } catch (err) {
    return next(new HttpError("Oops! Process failed, please do contact admin", 500));
  }
};
